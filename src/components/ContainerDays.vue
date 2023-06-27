<template>
  <v-container>
    <v-card-actions>
      <v-btn @click="convertDay()">convert</v-btn>
 <div v-for="i in daysList" :key="i">
  <v-btn :class="activeDay(i)"><label><input type="radio" v-model="selectedCategory"  :value="i.value" /> {{i.string}}</label></v-btn><br>
 </div>
 
    </v-card-actions>
   
   <v-row>

  <v-card  v-for="item in filteredDays(b)" :key="item.id"
    class="mx-auto"
    max-width="344"
    variant="outlined"
  >    <v-card-actions>


    </v-card-actions>
    <v-card v-if="show" :val="item.main.temp_max">
      <div>
        <div class="text-overline mb-1">
      *{{item.dt_txt}}*
       {{item.weather[0].icon}}
       {{ item.dt_txt | moment("ddd, h:mm a ") }}
       {{item.dt }}

        </div>
        <div class="text-overline mb-1">
        {{item.main.temp_min}}
        {{item.main.temp_max}}  <img :src="'https://openweathermap.org/img/wn/'+item.weather[0].icon+'@2x.png'"/>
        <h1></h1>
        </div>
        <div class="text-h1 mb-1">
      
        </div>
        <div lass="text-h2 mb-1">
      </div> </div>
    </v-card>

   <!---<-card-actions>
      <v-btn variant="outlined">
        Button
      </v-btn>
    </v-card-actions> -->
  </v-card>
</v-row>
</v-container>
</template>
<script>
import axios from 'axios'


export default{
  name: 'ContainerDays',

  data (){
    return{
      item: '',
      show: true,
      con: "0",
      selectedCategory: "",
      daysList: [
      {option: 'selectedCategory', value: 'All', string: 'All Days'},
      {option: 'selectedCategory', value: 1, string: 'Monday'},
      {option: 'selectedCategory', value: 2, string: 'Tuesday'},
      {option: 'selectedCategory', value: 3, string: 'Wednesday'},
      {option: 'selectedCategory', value: 4, string: 'Thursday'},
      {option: 'selectedCategory', value: 5, string: 'Friday'},
      {option: 'selectedCategory', value: 6, string: 'Saturday'},
      {option: 'selectedCategory', value: 0, string: 'Sunday'},
        ]
      
      

 
    }
  },computed:{

                 activeDay(){
                  return i =>{
                    if(i.value === 0){
                      return 'active-class';
                    }
                    else{
                      return 'non-active'}
                  }
                  
           
            //    // var nd = new Date()
            //    // var cd = this.convertDays(nd)           
            // if (cd === 1){
            //    return 'active'
            //  }
            //  else{
            //    return 'active'
            //  }
            
            },
  },

  methods : {
    convertDays(x){
      
      var cd = new Date(x).getDay();
   
      return cd

    },
        // activeDay(){
        //       this.daysList.forEach(element =>{
        //         if(element.value === 0){
        //           return 'active'
        //         }
        //         else{
        //           return 'active'

        //         }
        //       })
            

          
   
             
          
            
        //     },


            filteredDays() {
              var vm = this;
               var con = '';
              var i ='';
              var u = vm.con;
              var category = vm.selectedCategory;
              var arr = vm.daysList;
              for (i = 0; i < arr.length; i++){
                if(category === "All"){
                  return vm.b;

                }
  
                else if(category === arr[i].value) {
                   return vm.b.filter(function(item) {
                  u = vm.convertDays(item.dt_txt)
                 
                 if (u === arr[i].value){        
                       
                     return item.dt_txt
                   }

                   else{
                     console.log(con)
                   }
                  return item.dt_txt.includes('17');
        });
                 
                  }
                }
    }
 
          
   
  


  },
  watch:{},
  mounted () {
        axios
    .get(
      'https://api.openweathermap.org/data/2.5/forecast?lat=27.496&lon=-82.59&units=imperial&appid=801e74b46fc1681e6688cc0d730ba1ba')
    .then(response =>{
      this.b = response.data.list
      this.daysTempMin = response.data.list.temp_min
      this.daysTempMax = response.data.list.temp_max
      this.weatherIcon = response.data.list.weather
     

    })
  },
  props: {
    temp: Number,
    description: String,
    location: String,
    b: Object,
    weatherIcon: Object,
    val: String,
    

  }
}



</script>
<style>
  .active {
    background-color: purple !important;
  }
    .non-active {
    background-color: red !important;
  }


</style>