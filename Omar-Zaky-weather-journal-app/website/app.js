/* Global Variables */
const zip = document.querySelector('#zip');
const feelings = document.querySelector('#feelings');
const btn = document.querySelector('#generate');
const date = document.querySelector('#date');
const temp = document.querySelector('#temp');
const content = document.querySelector('#content');
const BaseUrl = "https://api.openweathermap.org/data/2.5/weather?zip=";
const ApiKey = ",us&appid=623b7332ed0c1c4176fcc62ebc7dc655&units=metric";

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();


const postData = async ( url = '', data = {})=>{
    console.log(data);
      const response = await fetch(url, {
      method: 'POST', 
      credentials: 'same-origin',
      headers: {
          'Content-Type': 'application/json',
      },       
      body: JSON.stringify(data), 
    });

      try {
      const newData = await response.json();
      console.log(newData);
      return newData;
      }
      catch(error)
      {
      console.log("error", error);
      }
  }

  

const getData = async (BaseUrl,UserZip,ApiKey) => {
    const res = await fetch(BaseUrl+UserZip+ApiKey)
    try{
      const data = await res.json();
      console.log(data)
      return data;
    }
    catch{
      console.log("error", error);
    }
  }

const updateUI = async () =>{
  const res = await fetch('/all')
  try{
    const AllData = await res.json();
    console.log(AllData)
    temp.innerHTML = AllData[0].temperature;
    date.innerHTML = AllData[0].date;
    content.innerHTML = AllData[0].userResponse;
  }
  catch{
    console.log("error", error);
  }
}


btn.addEventListener('click',()=>{
    let UserZip = zip.value;
    let UserFeeling = feelings.value;
    getData(BaseUrl,UserZip,ApiKey).then((data)=>{
    postData('/addData', {temperature : data.main.temp ,date : newDate, userResponse : UserFeeling})
    .then(updateUI());
  });

});














