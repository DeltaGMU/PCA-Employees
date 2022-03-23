<template>
    <div>
    <div class = "sideBar">
         <Sidebar>   </Sidebar>
    </div>

    <div class = "empContent">

        <h1>Manage Students</h1>

        <button class="btn blueBtn" @click="$router.push({ path: 'createstudent'})">
            Create Student 
         </button>
        
        <br> <br>

        <!-- >Search and filter through employees <-->
        <input class = "search-bar" type="text"  v-model= "query" placeholder="Search for students.." title="Type in a name">
        
        <table class = "table">
            <thead>
                <th class = "table-th text-center" v-for = "option in options.headings" v-bind:key = "option" scope = "col" >
                    {{ option }}
                </th>
            </thead>
            <tbody>
                <tr class = "row-striped" v-for = "student in studentInfo" v-bind:key="student">
                    <td class = "column text-center">{{ student.car_pool_number }} </td>
                    <td class = "column text-center">{{ student.last_name }} </td>
                    <td class = "column text-center">{{ student.first_name}} </td>
                    <td class = "column text-center"> 
                        <button class="btn blueBtn" @click="$router.push({ path: 'editStudent'})">
                            Edit 
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
          
    </div>
    </div>
</template> 

<script>
    import Sidebar from "../components/Sidebar.vue";
    export default {
        components: {
            Sidebar
        },
        data() {
        return {
            //query: '',
            studentInfo: [
                {
                    'car_pool_number':"23",
                    'last_name':'Barnes',
                    'first_name': 'Jamie'
                },
                {
                    'car_pool_number':"51",
                    'last_name':'Coleman',
                    'first_name': 'Penny'
                },
                {
                    'car_pool_number':"4",
                    'last_name':'Klein',
                    'first_name': 'John'
                }
                
            ],
        
            columns: [
                'carpoolNum',
                'last_name',
                'first_name',
                'editStudent'
            ],


            options: {
                headings: {
                    carpoolNum: 'Carpool Number',
                    last_name: 'Last Name',
                    first_mame: 'First Name',
                    editStudent: 'Edit Student'
                }
            }
        }
    },
    };
</script>