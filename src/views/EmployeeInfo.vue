<template>
    <div class="row">
        <div class="col-2 col-md-4 col-lg-3 col-xxl-2">
            <Sidebar>   </Sidebar>
        </div>
        <div class = "mt-3 col-10 col-md-8 col-lg-9 col-xxl-10 pe-3 pe-md-4 pe-xl-5"
        >
            <h1>Reporting Period</h1>
            <h3>XX-XX-2022 - XX-XX-2022</h3>

            <br>
            <!-- >Search and filter through employees <-->
            <input class = "search-bar" type="text"  v-model= "query" placeholder="Search for employees.." title="Type in a name">
            
            <table class = "table">
                <thead>
                    <th class = "table-th text-center" v-for = "option in options.headings" v-bind:key = "option" scope = "col" >
                        {{ option }}
                    </th>
                </thead>
                <tbody>
                    <!--<template v-for = "emp in empInfo" >
                        <div v-bind:key="emp.last_name"> -->

                        <tr class = "row-striped" v-for = "emp in empInfo" v-bind:key="emp">
                            <td class = "column text-center">{{ emp.last_name }} </td>
                            <td class = "column text-center">{{ emp.first_name}} </td>
                            <td class = "column text-center">{{ emp.work_hours}} </td>
                            <td class = "column text-center">{{ emp.pto_hours}} </td>
                            <td class = "column text-center">{{ emp.extra_hours}} </td>
                            <td class = "column text-center"> 
                                <button class="btn blueBtn" @click="$router.push({ })">
                                    <img src="https://s2.svgbox.net/hero-outline.svg?ic=zoom-in&color=ffffff" width="28" height="28">
                                </button>
                            </td>
                        </tr>
                        <!-- <tr class = "row-striped" v-for = "(item, i) in empInfo" v-bind:key="i">
                            <td class = "column">{{ item.last_name}} </td>
                            <td class = "column">{{ item.first_name}} </td>
                            <td class = "column">{{ item.work_hours}} </td>
                            <td class = "column">{{ item.pto_hours}} </td>
                            <td class = "column">{{ item.extra_hours}} </td>
                            <td class = "column">{{ item.sub_status}} </td>
                        </tr> -->
                    <!--  </div>
                    </template> -->
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
            //empInfo: [],
            empInfo: [
                {
                    'last_name':'Adams',
                    'first_name': 'Jane',
                    'work_hours': 30,
                    'pto_hours': 0,
                    'extra_hours': 0
                },
                {
                    'last_name':'Smith',
                    'first_name': 'Amy',
                    'work_hours': 30,
                    'pto_hours': 0,
                    'extra_hours': 0
                },
                {
                    'last_name':'Jones',
                    'first_name': 'Sam',
                    'work_hours': 30,
                    'pto_hours': 0,
                    'extra_hours': 0
                },
                
                
                
            ],
            columns: [
                'last_name',
                'first_name',
                'work_hours',
                'pto_hours',
                'extra_hours'
            ],
            empCollection: [],
            options: {
                headings: {
                    last_name: 'Last Name',
                    first_mame: 'First Name',
                    work_hours: 'Work Hours' ,
                    pto_hours: 'PTO Hours',
                    extra_hours:'Extra Hours',
                    view_details: 'View Details'
                }
            }
        }
    },
    /*
     methods: {
            //sortBy: function(sortKey) {
               // this.reverse = (this.sortKey == sortKey) ? ! this.reverse : false;
             //   this.sortKey = sortKey;
            // }
            search () {
             var results = [];
             var searchData = this.empInfo;
             if (this.query == "") {
                 this.emp = this.empInfo;
             } else {
                 for (var i=0 ; i < searchData.length ; i++ ) {
                    
                     var sparam = this.query.toLowerCase();
                     for (var j in searchData[i]) {
                             var value = searchData[i][j];
                             if (typeof value == "string" && value.toLowerCase().indexOf(sparam) >=0){
                                 results.push(searchData[i]);
                             }
                     }
                     }
                 }
                 this.emp = results;
                
             
            }
            },
  
         
            getEmpInfo() {
                fetch('insert database link here')
                .then(response => response.json())
                .then(res => {
                    if (this.search){
                        this.empInfo = res.results.filter(people =>
                            people.name.toLowerCase().includes(this.search.toLowerCare())
                            );
                    } else {
                        this.empInfo = res.results;
                    }
                }
                
                );
            }
            },
            created() {
                this.getEmpInfo();
            } 
    

        /*
        filteredEmp () {
        return this.empInfo.filter(item => {
            return item.name.indexOf(this.search) > -1
        })
        }
        

    beforeMount(){
        this.empInfo = this.data;
    },

    watch : {
         query () {
             this.search();
         }
     }
    


    mounted() {
        this.axios.get('address').then((response) => {
            this.empCollection =response.data
        })
    }
    */
   
    };
</script>