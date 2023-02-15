
let localStore; 
let temp;
//GetByID 
let chartnumberValue = document.getElementById("chartid");
let firstnameValue = document.getElementById("fname");
let middlenameValue = document.getElementById("mname");
let lastnameValue = document.getElementById("lname");
let genderValue = document.getElementById("sex");
let dobValue = document.getElementById("dateofbirth");

let homeurl = `https://localhost:7162/api/Patient`;
let pid = document.location.href.split('?')[1];
let queryString = new URLSearchParams(pid);
let id;
for (let pair of queryString.entries()) {
    console.log("Key is: " + pair[0]);
    console.log("Value is: " + pair[1]);
    id = pair[1];
}
const url = `https://localhost:7162/api/Patient/${pid}`;
//console.log(url);
if (id != "") {
    const res = fetch(`https://localhost:7162/api/Patient/${id}`);
    

     const data = res.then(async (r) => {
        console.log(r);
        return r.json();
    }).then((d) => {
        const t = d[0];
        temp = d[0];
        localStore = d[0];

        chartnumberValue.innerHTML = t.chart_number;
        firstnameValue.value = t.firstname;
        lastnameValue.value = t.lastname;
        middlenameValue.value = t.middlename;
        genderValue.value = t.sex;
        console.log(d[0]);      
        let newdate = new Date(t.dob).toISOString().split('T')[0];
        var td = new Date(newdate).getDate() +1;
        var m = new Date(newdate).getMonth() + 1;
        var y = new Date(newdate).getFullYear();
        dobValue.value = y + '-' + (m <= 9 ? '0' + m : m) + '-' + (td <= 9 ? '0' + td : td);
        //let day = new Date(newdate).getDate()+1;
        //console.log(day);
        //newdate.setDate(day);
        //console.log(newdate);
        //console.log(d);
        //console.log(m);
        //console.log(y);

    }).catch(e1 =>
    {
        if (id != null) {
            var snacknotfound = document.getElementById('snackbar-not-found');
            snacknotfound.className = "shownotfound";
            setTimeout(function () {
                console.log('hello');
                console.log('inside not found timeout');
                snacknotfound.className = snacknotfound.className.replace("shownotfound", "");
            }, 3000);
            //window.open(`https://localhost:7162`);
        }
    });
}


function submitData(event) {
    event.preventDefault();
    //object of formdata
    let data = new FormData(document.getElementById("formfinal"));

    let pdata = Object.create({})
    for (let [k, v] of data.entries()) {
        pdata[k] = v;
    }

    //calculate age from date of birth
    let dob = new Date(pdata.dob);
    let month_diff = Date.now() - dob.getTime();
    let age_dt = new Date(month_diff);
    let year = age_dt.getUTCFullYear();
    let age = year - 1970;


    if (age < 18) {
        window.alert(`Please add a contact for the Patient as ${pdata.Sex == "Male" ? "he" : "she"}, is a minor.`)
    }


    
    //post data if id isn't found in url
    if (!id) {
        
        let postPatientData = {
            "firstname": document.getElementById("fname").value,
            "middlename": document.getElementById("mname").value,
            "lastname": document.getElementById("lname").value,
            "sex": document.getElementById("sex").value,
            "dob": document.getElementById("dateofbirth").value
        };
        console.log(postPatientData);
        fetch('https://localhost:7162/api/Patient', {
            method: "POST",
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(postPatientData)
        })
            .then(res => res.json())
            .then(data => {
                window.open(`https://localhost:7162/?id=${data[0].patientcreate}`, '_self');
            })
        
        .catch(err => console.log(err));
    }

    //put data if id found in url
    if (id) {
        //console.log(id);
        let puturl = `https://localhost:7162/api/Patient/${id}`;
        let putPatientData = {
            "firstname": document.getElementById("fname").value,
            "middlename": document.getElementById("mname").value,
            "lastname": document.getElementById("lname").value,
            "sex": document.getElementById("sex").value,
            "dob": document.getElementById("dateofbirth").value
        }
        fetch(`https://localhost:7162/api/Patient/${id}`, {
            method: "PUT",
            body: JSON.stringify(putPatientData),
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data =>console.log(data))
            .catch(err => console.log(err));
    }

}

//toast display in local storage
console.log(sessionStorage.getItem("snackbar-saved"));
if (sessionStorage.getItem("snackbar-saved") != null) {
    var snacksave = document.getElementById("snackbar-saved");
    snacksave.className = "showsaved";
    console.log("inside timeout update")

    setTimeout(function () {
        snacksave.className = snacksave.className.replace("showsaved", "");
        sessionStorage.removeItem("snackbar-saved");
    }, 3000);
}

//toast display for update and create
function submitMessage() {
    let form = document.getElementsByTagName('form')[0];
    console.log("update");
    form.addEventListener('submit', (e) => {
        e.preventDefault();  
        console.log("update down");
        if (id != null) {
            var snackup = document.getElementById('snackbar-updated');
            snackup.className = "show";
            setTimeout(function () {
                console.log("inside timeout update")
                snackup.className = snackup.className.replace("show", "");
            }, 3000);
        }
        else {
            console.log("inside else");
            sessionStorage.setItem("snackbar-saved", true);
            sessionStorage.getItem("snackbar-saved");
            console.log(sessionStorage.getItem("snackbar-saved"));
        }
    });
}


//reset form data
function cancelChanges() {
    document.getElementById('formfinal').reset();
    console.log(localStore);
    if (localStore != undefined) {
        chartnumberValue.innerHTML = localStore.chart_number;
        firstnameValue.value = localStore.firstname;
        lastnameValue.value = localStore.lastname;
        middlenameValue.value = localStore.middlename;
        genderValue.value = localStore.sex;
        let cachedate = new Date(localStore.dob).toISOString().split('T')[0];
        var td = new Date(cachedate).getDate() + 1;
        var m = new Date(cachedate).getMonth() + 1;
        var y = new Date(cachedate).getFullYear();
        dobValue.value = y + '-' + (m <= 9 ? '0' + m : m) + '-' + (td <= 9 ? '0' + td : td);
    }
}

function changeImage(imageupload) {
    console.log('inside image upload'+imageupload.target.files.length)
    let image = document.getElementById('imageid');
    image.src = URL.createObjectURL(imageupload.target.files[0]);
    console.log(image);
}



//sidebar hide and show
function sidebarShow() {
    var leftshowcontent = document.getElementById("sideshow");
    var sidebarCollapse = document.getElementById("sidebar-collapse").classList;
    var expand = document.getElementById("maindiv");
    // console.log(leftshowcontent);
    leftshowcontent.classList.toggle("hide-sidebar");
    expand.classList.toggle("expand-main");
    sidebarCollapse.toggle("change-icon-180");
}


//other info hide and show

function otherInfoShow() {
    var othershowcontent = document.getElementById("other-in");
    var otherCollapse = document.getElementById("othersection").classList;
    // console.log(othershowcontent);
    othershowcontent.classList.toggle("hide-otherinfo");
    otherCollapse.toggle("change-icon-90");
}

//adding and deleting address panel

function addSection(contact) {
    var addbtn = document.getElementById("sec12");
    var faxRemove = document.getElementById("add-fax");
    var emailRemove = document.getElementById("add-email");
    var webRemove = document.getElementById("add-website");
    contact.parentElement.parentElement.nextElementSibling.insertAdjacentHTML(
        'beforeend',
        `
                               <div id="form1" class="section1">
                                    <fieldset class="fieldset-contact">
                                        <legend class="contact-legend">
                                            <select name="home" id="add1">
                                                <option>Home</option>
                                                <option>Work</option>
                                                <option>Other</option>
                                            </select>
                                            <span class="address-header">
                                                <span><h6>Address</h6></span>
                                                <span><i class="fa-solid fa-trash-can" onclick="removeSection(this)" id="address-add-btn" style="font-size:13px;"></i></span>
                                                <span id="then"></span>
                                            </span>
                                        </legend>
                                        <div>
                                            <div>
                                                <span class="font-contact"><label>Street</label><br><input type="text" name="street1"></span>

                                                <div class="address-keywords">
                                                    <span class="font-contact">Zip</span>
                                                    <span class="font-contact">City</span>
                                                    <span class="font-contact">State</span>
                                                    <span class="font-contact">Country</span>

                                                </div>

                                                <div class="location-class">
                                                    <div class="location-input">
                                                        <input type="text" />

                                                    </div>
                                                    <div class="location-input">
                                                        <input type="text" />
                                                    </div>
                                                    <div class="location-input">
                                                        <select name="code1" id="code1">
                                                            <option>California</option>
                                                            <option>Pensilvenia</option>
                                                            <option>Florida</option>
                                                        </select>
                                                    </div>
                                                    <div class="location-input">
                                                        <select name="code1" id="code1">
                                                            <option>India</option>
                                                            <option>US</option>
                                                            <option>Canada</option>
                                                        </select>
                                                    </div>
                                                    <div class="trashbin">
                                                        <i class="fa-solid fa-trash-can" onclick="removeSectionLocation(this)"></i>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>



                                        <div class="phone-header">
                                            <div><h6>Phone<i class="fa-solid fa-circle-plus" onclick="addPhone(this)"></i></h6></div>
                                            <div class="phone-keywords">
                                                <div class="font-contact">Type</div>
                                                <div class="font-contact">Code</div>
                                                <div class="font-contact">Number</div>
                                                <div class="font-contact">Ext.</div>
                                            </div>
                                            <hr />
                                            <div class="phone-keywords-header">
                                                <div class="phone-keywords-input">
                                                    <select name="type1" id="type">
                                                        <option>Call</option>
                                                        <option>Landline</option>
                                                    </select>
                                                </div>
                                                <div class="phone-keywords-input">
                                                    <select name="code1" id="code1">
                                                        <option>+1(US)</option>
                                                        <option>+91(Ind)</option>
                                                        <option>+7(Rus)</option>
                                                    </select>
                                                </div>
                                                <div class="phone-keywords-input">
                                                    <input type="text" name="number1" id="">
                                                </div>
                                                <div class="phone-keywords-input">

                                                </div>
                                                <div class="trashbin">
                                                    <i class="fa-solid fa-trash-can" onclick="removeSectionPhone(this)"></i>
                                                </div>

                                            </div>
                                        </div>

                                        <h6>Fax<i class="fa-solid fa-circle-plus" onclick="addFax(this)"></i></h6>
                                        <h6>Email<i class="fa-solid fa-circle-plus" onclick="addEmail(this)"></i></h6>
                                        <div>
                                            <div class="email-remove"><input type="text"><i class="fa-solid fa-trash-can" onclick="removeSectionEmail(this)"></i></div>
                                        </div>

                                        <h6>Website<i class="fa-solid fa-circle-plus" onclick="addWebsite(this)"></i></h6>

                                    </fieldset>
                                </div>
        `
    );
}

function addSectionLocation(location) {
    console.log(location.parentElement.parentElement.parentElement);
    location.parentElement.parentElement.parentElement.nextElementSibling.insertAdjacentHTML(
        'beforeend', `
                                        <div>
                                            <span class="font-contact"><label>Street</label><br><input type="text" name="street1"></span>

                                            <div class="address-keywords">
                                                <span class="font-contact">Zip</span>
                                                <span class="font-contact">City</span>
                                                <span class="font-contact">State</span>
                                                <span class="font-contact">Country</span>

                                            </div>

                                            <div class="location-class">
                                                <div class="location-input">
                                                    <input type="text" />

                                                </div>
                                                <div class="location-input">
                                                    <input type="text" />
                                                </div>
                                                <div class="location-input">
                                                    <select name="code1" id="code1">
                                                        <option>California</option>
                                                        <option>Pensilvenia</option>
                                                        <option>Florida</option>
                                                    </select>
                                                </div>
                                                <div class="location-input">
                                                    <select name="code1" id="code1">
                                                        <option>India</option>
                                                        <option>US</option>
                                                        <option>Canada</option>
                                                    </select>
                                                </div>
                                                <div>
                                                    <i class="fa-solid fa-trash-can" onclick="removeSectionLocation(this)" style="font-size:16px;"></i>
                                                </div>
                                            </div>
                                        </div>
        `);
    document.getElementById('remove-plus-icon').remove();
}

function addPhone(phone) {
    phone.parentElement.parentElement.parentElement.insertAdjacentHTML(
        'beforeend',`
                                           <div class="phone-keywords-header">
                                                <div class="phone-keywords-input">
                                                    <select name="type1" id="type">
                                                        <option>Call</option>
                                                        <option>Landline</option>
                                                    </select>
                                                </div>
                                                <div class="phone-keywords-input">
                                                    <select name="code1" id="code1">
                                                        <option>+1(US)</option>
                                                        <option>+91(Ind)</option>
                                                        <option>+7(Rus)</option>
                                                    </select>
                                                </div>
                                                <div class="phone-keywords-input">
                                                    <input type="text" name="number1" id="">
                                                </div>
                                                <div class="phone-keywords-input" ">
                                                    
                                                </div>
                                                <div class="trashbin">
                                                    <i class="fa-solid fa-trash-can" onclick="removeSectionPhone(this)"></i>
                                                </div>

                                            </div>
    `);
}

function addFax(fax) {
    fax.parentElement.insertAdjacentHTML(
        "beforeend",
        `<div class="fax-email-web"><input type="text"><i class="fa-solid fa-trash-can" onclick="removeSectionFax(this)"></i></div>`);
}
function addEmail(email) {
    email.parentElement.nextElementSibling.insertAdjacentHTML(
        'beforeend',
        `<div class="fax-email-web"><input type="text"><i class="fa-solid fa-trash-can" onclick="removeSectionEmail(this)"></i></div>`);
}
function addWebsite(web) {
    web.parentElement.insertAdjacentHTML(
        'beforeend',
        `<div class="fax-email-web"><input type="text"><i class="fa-solid fa-trash-can" onclick="removeSectionWeb(this)"></i></div>`);
}

function removeSection(contactdelete) {
    contactdelete.parentElement.parentElement.parentElement.parentElement.parentElement.remove();
}
function removeSectionPhone(phonedelete) {
    phonedelete.parentElement.parentElement.remove();
    if (phonedelete.parentElement.parentElement.parentElement.children[1].children[0] == null) {
        phonedelete.parentElement.parentElement.parentElement.children[1].remove();
    }
}


function removeSectionFax(faxdelete) {
    faxdelete.parentElement.remove();
}


function removeSectionEmail(emaildelete) {
    emaildelete.parentElement.remove();
}

function removeSectionWeb(webdelete) {
    webdelete.parentElement.remove();
}

function removeSectionLocation(locationdelete) {
    console.log(locationdelete.parentElement.parentElement.parentElement);

    locationdelete.parentElement.parentElement.parentElement.parentElement.parentElement.children[0].children[1].children[2].insertAdjacentHTML('beforeend', `<i id="remove-plus-icon" class="fa-solid fa-circle-plus" style="font-size:13px" onclick="addSectionLocation(this)"></i>`);
    
    locationdelete.parentElement.parentElement.parentElement.remove();
}



function enableFeeSchedule() {
    console.log('inside funtion');
    if (document.getElementById('selfpaycheck').checked == true) {
        console.log('inside if');
        document.getElementById('FeesSchedule').disabled = false;
        console.log('after if');
    }
    else {
        console.log('inside else');
        document.getElementById('FeesSchedule').disabled = true;
        console.log('after else');
    }
}

function enableMultiBirth() {
    console.log('inside funtion');
    if (document.getElementById('birth-check').checked == true) {
        console.log('inside if');
        document.getElementById('birth-enable').disabled = false;
        console.log('after if');
    }
    else {
        console.log('inside else');
        document.getElementById('birth-enable').disabled = true;
        console.log('after else');
    }
}

document.getElementById('type-select').onchange = function () {
    document.getElementById('value-select').disabled = false;
}

function enableDeceased() {
    console.log('inside funtion');
    if (document.getElementById('deceased-check').checked == true) {
        console.log('inside if');
        document.getElementById('deceased-enable').disabled = false;
        console.log('after if');
        document.getElementById('deceased-enable').onchange = function () {
            document.getElementById('deceased-time-enable').disabled = false;
        }
    }
    else {
        console.log('inside else');
        document.getElementById('deceased-enable').disabled = true;
        console.log('after else');
    }
}




