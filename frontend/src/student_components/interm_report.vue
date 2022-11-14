<template>
    <el-container>
        <el-header class="title">期中報告繳交</el-header>
        <el-main>
            <el-upload type="file" :auto-upload="false" drag :action="action" :on-exceed="exceed" :on-remove="remove"
                :multiple="false" @change="upload_file" :limit="1" accept="application/pdf">
                <div class="el-upload__text">請先將檔案拖到此處，或<em>點選上傳</em></div>
                <div class="el-upload__tip" slot="tip">只能上傳pdf檔案，一次只能上傳一個檔案</div>
            </el-upload>
            <el-button type="success" @click="submit_file">上傳</el-button>
            <el-button type="success" @click="get_file">下載期中報告</el-button>
            <el-button type="success" @click="preview_file">預覽期中報告</el-button>
        </el-main>
    </el-container>
</template> 

<script>
import axios from 'axios';

export default {
    data() {
        return {
            param: new FormData(),
            file: ""
        }
    },
    methods: {
        get_file() {
            const path = import.meta.env.VITE_API+'get_file'
            axios.post(path, { group_id: sessionStorage.getItem("group_id"), type: "interm_report" }, { responseType: 'blob' })
                .then(
                    response => {
                        let blob = new Blob([response.data], { type: "application/pdf" })
                        let reader = new FileReader()
                        let file_name = sessionStorage.getItem("group_id") + "期中報告.pdf"
                        if (window.navigator.msSaveOrOpenBlob) {
                            navigator.msSaveBlob(blob, file_name)
                        }
                        else {
                            reader.readAsDataURL(blob, 'ASCII')
                            reader.onload = (e) => {
                                let a = document.createElement('a')
                                a.download = file_name
                                a.href = e.target.result
                                document.body.appendChild(a)
                                a.click()
                                document.body.removeChild(a)
                            }
                        }
                    }
                )
        },
        preview_file() {
            const path = import.meta.env.VITE_API+'get_file'
            axios.post(path, { group_id: sessionStorage.getItem("group_id"), type: "interm_report"},{ responseType: 'blob' })
                .then(
                    response => {
                        if(response.data.size!=0){
                        const binartdata=[]
                        binartdata.push(response.data)
                        let blob = new Blob(binartdata, { type: "application/pdf" })
                        const url = window.URL.createObjectURL(blob)
                        window.open(url)}
                        else{
                            this.$message.warning('尚未上傳期中報告')
                        }
                    })
        },
        remove() {
            this.param = new FormData()
        },
        upload_file(file) {
            this.file = file
            this.param.append("group_id", sessionStorage.getItem("group_id"))
            this.param.append("file", this.file.raw)
            this.param.append("file_name", this.file.name)
            this.param.append("file_size", this.file.size / 1024)
        },
        exceed() {
            this.$message.warning('只能上傳一個檔案')
        },
        submit_file() {
            // let config = {
            //     headers: {
            //         'Content-Type': 'multipart/form-data'
            //     }
            // }
            const path = import.meta.env.VITE_API+'upload_file'
            axios.post(path, this.param)
                .then(response => {
                    if (response.data.res != "") {
                        this.$message.success('上傳成功')
                    }
                    else{
                        this.$message.warning('上傳失敗')
                    }
                }
                )
        }
    }
}
</script>

<style lang="scss" scoped>
.title {
    font-size: 35px;
    font-weight: 900;
}
</style>