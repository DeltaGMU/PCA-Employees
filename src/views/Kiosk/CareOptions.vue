<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="mt-5 col-xl-10 col-lg-10 col-md-10 col-sm-12 min-vh-100">
                <div class="homeContainer">
                    <div class="text-center noSelect">
                        <img src="../../assets/pcawhite.svg" class="mb-4 homeLogo" alt="PCA Lion Logo">
                    </div>
                    <div class="mt-5 text-center noSelect">
                        <h3 class="text-blue">Please ensure the following student information is correct and select one of the options shown below:</h3>
                        
                        <table class="table text-blue">
                            <tbody>
                                <tr>
                                    <td><b>Student ID:</b></td>
                                    <td>{{ this.student_info.student_id }}</td>
                                </tr>
                                <tr>
                                    <td><b>First Name:</b></td>
                                    <td>{{ this.student_info.first_name[0].toUpperCase() + this.student_info.first_name.slice(1).toLowerCase() }}</td>
                                </tr>
                                <tr>
                                    <td><b>Last Name:</b></td>
                                    <td>{{ this.student_info.last_name[0].toUpperCase() + this.student_info.last_name.slice(1).toLowerCase() }}</td>
                                </tr>
                                <tr>
                                    <td><b>Grade:</b></td>
                                    <td>{{ this.student_info.grade.name.toUpperCase() }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="text-center">
                        <label for="parentSignatureInput" class="col-sm-4">
                            Please enter your full name here:
                        </label>
                        <input type="text" autocomplete="off" v-model="parent_signature" class="form-control" placeholder="Parent Signature..." id="parentSignature" name="parentSignatureInput">
                    </div>
                    <div class="twoBtnCol">
                        <button class="btn" @click="beforeCare" :disabled="this.parent_signature.length === 0" :class="this.parent_signature.length === 0 ? 'btn-secondary' : 'blueBtn'">Before-Care</button>
                        <button class="btn" @click="afterCare" :disabled="this.parent_signature.length === 0" :class="this.parent_signature.length === 0 ? 'btn-secondary' : 'blueBtn'">After-Care</button>
                    </div>
                </div>
            </div>
        </div>        
    </div>
</template>

<script>
export default {
    name: "CareOptions",
    components: {},
    data() {
        return {
            student_info: this.$store.getters.StateStudentInfo,
            parent_signature: ""
        }
    },
    methods: {
        beforeCare() {
            this.$router.push({name: "CheckInAndCheckOut", params: {
                student_info: this.student_info,
                parent_signature: this.parent_signature
            }}).catch((err) => console.log(err));
        },
        afterCare() {
            this.$router.push({name: "CheckInAndCheckOut", params: {
                student_info: this.student_info,
                parent_signature: this.parent_signature
            }}).catch((err) => console.log(err));
        }
    },
    mounted() {
        
    }
};
</script>