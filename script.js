let loader = document.getElementsByClassName("loader")[0];
let detailsBelow = document.getElementsByClassName("details-below")[0];

async function getUsers() {

    loader["hidden"] = false;
    detailsBelow["hidden"] = true;

    //FETCHING DATA
    const response = await fetch("https://run.mocky.io/v3/010e898c-a05c-4a0a-b947-2a65b5a267c5");
    return response.json(); // PARSING JSON RESPONSE INTO NATIVE JS OBJ.
}

getUsers()
    .then(users => {
        // console.log(users);
        generateUserTable(users);
    }).catch((e) => {
        alert("Problem Fetching User Data ! :( ");
        // console.log(e);
    })


generateUserTable = (users) => {

    let divContainer = document.getElementById("users-tbl");

    let col = ["first_name", "last_name", "username", "title", "country"];

    let tblheader = ["First Name", "Last Name", "Userame", "Title", "Country"];

    //DYNAMIC TABLE
    let table = document.createElement("table");
    table.classList.add('user-tbl');

    //TABLE HEADER ROW BASED ON tblheader COLUMN DATA
    let tr = table.insertRow(-1);

    for (let i = 0; i < tblheader.length; i++) {
        let th = document.createElement("th");      // TABLE HEADER
        th.innerHTML = tblheader[i];
        tr.appendChild(th);
    }


    // ADD JSON DATA TO THE TABLE AS ROWS
    for (let i = 0; i < users.length; i++) {
        tr = table.insertRow(-1);

        //SETTING USER.ID AS KEY FOR ROW SO COULD UNIQUELY IDENTIFY EACH USER
        tr.setAttribute("key", users[i].id)

        for (let j = 0; j < col.length; j++) {
            let tabCell = tr.insertCell(-1);
            if (col[j] === "title") {
                tabCell.innerHTML = users[i].employment.title;
            }
            else if (col[j] === "country") {
                tabCell.innerHTML = users[i].address.country;
            }
            else {
                tabCell.innerHTML = users[i][col[j]];
            }

        }
    }

    // FINALLY ADD THE NEWLY CREATED TABLE WITH JSON DATA TO A CONTAINER.

    divContainer.innerHTML = "";
    divContainer.appendChild(table);

    //LOADER

    loader["hidden"] = true;
    detailsBelow["hidden"] = false;

    //SET FIRST USER INFO ON RIGHT PANEL/CARD
    createDtailsCard(users[0].id, users);

    //GET ROWS IN A TABLE
    const a = document.getElementsByTagName("tr");
    // console.log(a);

    //SET ONCLICK EVENT ON EACH ROW
    for (let i = 1; i <= users.length; i++) {
        a[i].addEventListener('click', function (e) {
            // const id = e.path[1].attributes[0].nodeValue;
            const id = e.target.parentElement.attributes[0].nodeValue;
            createDtailsCard(id, users);
        });
    }


}


//CREATE USER DETAILS CARD ONCLICK

const createDtailsCard = (id, users) => {
    for (let i = 0; i < users.length; i++) {
        // console.log(users[i].id, id);
        if (users[i].id == id) {
            // console.log(users[i]);

            //SETTING AVATAR
            let avatar = document.getElementById("avatar");
            avatar.setAttribute("src", users[i].avatar);

            //CALLING GREET FUNCTION
            greetUser(users[i].first_name);


            //GETTING ELEMENTS TO SET DATA
            let id = document.getElementById("id");
            let uid = document.getElementById("uid");
            let pass = document.getElementById("pass");
            let uname = document.getElementById("uname");
            let username = document.getElementById("username");
            let mail = document.getElementById("mail");
            let mf = document.getElementById("mf");
            let phno = document.getElementById("phno");
            let sin = document.getElementById("sin");
            let dob = document.getElementById("dob");
            let title = document.getElementById("title");
            let skill = document.getElementById("skill");
            let addr = document.getElementById("addr");
            let ccn = document.getElementById("ccn");
            let ss = document.getElementById("ss");

            //SETTING DATA TO SPAN ELEMENTS
            id.innerHTML = users[i].id;
            uid.innerHTML = users[i].uid;
            pass.innerHTML = users[i].password;
            uname.innerHTML = `${users[i].first_name} ${users[i].last_name}`;
            username.innerHTML = users[i].username;
            mail.innerHTML = users[i].email;
            mf.innerHTML = users[i].gender;
            phno.innerHTML = users[i].phone_number;
            sin.innerHTML = users[i].social_insurance_number;
            dob.innerHTML = users[i].date_of_birth;
            title.innerHTML = users[i].employment.title;
            skill.innerHTML = users[i].employment.key_skill;
            addr.innerHTML = `${users[i].address.city}, ${users[i].address.state}, ${users[i].address.country}`;
            ccn.innerHTML = users[i].credit_card.cc_number;
            ss.innerHTML = users[i].subscription.status;

            //SCROLLING ONLY WHEN CARDS ARE ON TOP OF EACH OTHER || MOBILE VIEW
            if (document.documentElement.clientWidth <= 995) {
                scrollToDetails();
            }

        }
    }
}


//SCROLL FUNCTION

const scrollToDetails = () => {

    let pos = document.getElementById("userDetails-card");
    let elemPos = pos.getBoundingClientRect();
    // console.log(elemPos);
    window.scrollTo(0, elemPos.top)

}

//GREET USER FUNCTION

const greetUser = (UserName) => {
    let greetMessage = document.getElementById('greet-message');

    currentTime = new Date();

    (currentTime.getHours() < 12) ?
        greetMessage.innerHTML = `<b>Good Morning ${UserName} !</b>` :
        ((currentTime.getHours() < 17) ?
            greetMessage.innerHTML = `<b>Good Afternoon ${UserName} !</b>`
            : greetMessage.innerHTML = `<b>Good Evening ${UserName} !</b>`
        );
}





////////////////////////////////////////////////////
// ARRAY OPERATION [ADD,UPDATE,DELETE]


