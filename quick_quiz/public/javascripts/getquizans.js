let token = localStorage.getItem("token");
let data = sessionStorage.getItem("jsonquizdata"); // read data from session storage;
let targetquiz = sessionStorage.getItem("targetquiz");


let jsondata = JSON.parse(data);
// console.log((jsondata));

let x = 0; // for generating different name field
let qustionindex = 1; // for qustion indexing
html = "";
jsondata.forEach(ele => {
    if (ele.quizname === targetquiz) {
        console.log(ele);

        ele.qusans.forEach(element => {
            // console.log(element.qustion);

            html += `   <div class="container-fluid backgroundcolor">

    <div class="container my-4">

    <div class="card-group">
        <div class="card">
          <div class="card-body mx-3">
            <h5 class="card-title"><pre>(${qustionindex}) ${element.qustion}</h5> </pre>
            <hr>
            
                    <span>(a)</span> <input type="radio" id="male" name="gender${x}" value="${element.options[0].A}">
                    <label for="opsA">${element.options[0].A}</label><br>
                    <span>(b)</span> <input type="radio" id="female" name="gender${x}" value="${element.options[1].B}">
                    <label for="opsB">${element.options[1].B}</label><br>
                    <span>(c)</span> <input type="radio" id="other" name="gender${x}" value="${element.options[2].C}">
                    <label for="opsC">${element.options[2].C}</label><br>
                    <span>(d)</span> <input type="radio" id="temp" name="gender${x}" value="${element.options[3].D}">
                    <label for="opsD">${element.options[3].D}</label>
                  
          </div>
        </div>
      </div>
      </div>
      </div> `

            x++;
            qustionindex++;

        })



        document.getElementById('anssub').addEventListener('click', (e) => { // user submit answer

            console.log("button clicked shubham")

            var userans = [];

            document.getElementById("mychoice").innerHTML = "";
            var ele = document.getElementsByTagName('input');

            for (i = 0; i < ele.length; i++) {

                if (ele[i].type = "radio") {

                    if (ele[i].checked) { // geting user checked answer and push into userans[]
                        userans.push(ele[i].value);
                    }
                }
            }
            // console.log(userans);

            let score = 0;
            let actualans = []
            jsondata.forEach((ele) => {
                if (ele.quizname === targetquiz) { // finding targetquiz
                    console.log(ele);
                    ele.qusans.forEach((element) => {
                        actualans.push(element.answer);
                        // console.log("Answer ",element.answer);
                    })
                }
            })

            //comparing useranswer and actual answer
            for (let it = 0; it < userans.length; it++) {
                if (userans[it] === actualans[it]) {
                    score++;
                }
            }
            let totalqustion = actualans.length; // storing total qustion
            sessionStorage.setItem('totalqustion', totalqustion);
            sessionStorage.setItem('myscore', score);



            // Fetching privious score .

            let urls = "https://quickquizs.herokuapp.com/score";

            let params = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                }
            }

            let alloverscore = 0;
            fetch(urls, params)
                .then((res) => {
                    return res.json();
                })
                .then((json) => {
                    console.log("Serverside user score ", json);
                    alloverscore = json + score;
                    console.log("updated Allover score", alloverscore);


                    // updating score (serverside database)

                    let url = "https://quickquizs.herokuapp.com/score";

                    let data = {
                        "score": alloverscore
                    }

                    let paramsp = {
                        method: 'PUT',
                        body: JSON.stringify(data),
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer ' + token
                        }
                    }

                    fetch(url, paramsp)
                        .then((res) => {
                            return res.json();
                        })
                        .then((json) => {
                            console.log(json);
                            location = "../score.html";
                        })

                        .catch((err) => console.log("Error occure", err));

                })

                .catch((err) => console.log("Error occure", err));

        });

        document.getElementById('show').innerHTML = html;

    }
});

/*
created by Shubham Khunt

============contact============

Email   :-   shubhamkhunt08@gmail.com
github  :-   https://github.com/shubhamkhunt04
linkdin :-   https://www.linkedin.com/in/shubhamkhunt
*/