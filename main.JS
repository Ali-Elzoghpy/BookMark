let siteNameInput = document.getElementById("siteName")
let siteUrlInput = document.getElementById("siteUrl")
let submitBtn = document.getElementById("submitBtn")
let closeBtnIcon = document.getElementById("closeBtn")
let searchInput = document.getElementById("searchInput")
let modal = document.getElementById("modal")
let editBtn = document.getElementById("editBtn")
let modalInner = document.getElementById("modalInner")
let deletAllButton = document.getElementById("deletAllButton")
let alertValid = document.getElementById("alertValid")
let alertInValid = document.getElementById("alertInValid")
let deletBtnModal = document.getElementById("deletBtnModal")
let closeBtnModal = document.getElementById("closeBtnModal")
let modal2 = document.getElementById("modal2")

let index;
let mainArr = [];
let formElment = document.querySelector("form")

formElment.addEventListener("submit", function (e) {
    e.preventDefault()

})
//local storge if condition
if (localStorage.getItem("sites") != null) {
    mainArr = JSON.parse(localStorage.getItem("sites"))
    diplaySites()
}
submitBtn.addEventListener("click", addSite)
function addSite() {
    if (validSiteName() == true && validSiteUrl() == true) {
        let sites = {
            site: siteNameInput.value,
            url: siteUrlInput.value,

        }
        mainArr.push(sites)
        localStorage.setItem("sites", JSON.stringify(mainArr))
        diplaySites()
        clearFrom();

    } else {
        modal.classList.replace("d-none", "d-flex")
    }



}
function clearFrom() {
    siteNameInput.value = null
    siteUrlInput.value = null


}
function diplaySites() {
    let addRow = ``
    for (let i = 0; i < mainArr.length; i++) {
        addRow += `      <tr>
                        <td> ${(i + 1)}</td>
                        <td>${mainArr[i].site}</td>
                            <td>  <a  class="btn visit-btn"  target="_blank"  href="${mainArr[i].url}"><i class="fa-regular fa-eye pe-1"></i>  Visit </a></td>
                           <td><button onclick="setUpdate(${i})" class="btn btn-outline-warning"> <i class="fa-solid fa-pen pe-2"></i>Update</button></td>
                        <td>   <button onclick="deleteSite(${i})"  class="btn btn-danger"><i class="fa-solid fa-trash pe-2"></i> Delete</button></td>
                    
                         
                    </tr> `
    }
    document.getElementById("tableData").innerHTML = addRow
}
function deleteSite(i) {


    if (editBtn.classList.contains("d-none")) {

        mainArr.splice(i, 1)
        localStorage.setItem("sites", JSON.stringify(mainArr))
        diplaySites()

    } else {
        alert("how come u want to delete while Updating !!!")
    }
}
searchInput.addEventListener("keyup", searhSite)
function searhSite() {
    let string = searchInput.value;
    let addRow = ``
    for (let i = 0; i < mainArr.length; i++) {
        if (mainArr[i].site.toLowerCase().includes(string.toLowerCase()) == true)


            addRow += `      <tr>
                        <td> ${(i + 1)}</td>
                        <td>${mainArr[i].site.toLowerCase().replace(string, `<span class= "Bg">${string}</span>`)}</td>
                         <td>  <a  class="btn visit-btn"  target="_blank"  href="${mainArr[i].url}"><i class="fa-regular fa-eye pe-1"></i>  Visit </a></td>
                           <td><button onclick="" class="btn btn-outline-warning">Update</button></td>
                        <td>   <button onclick="deleteSite(${i})"  class="btn btn-danger"><i class="fa-solid fa-trash pe-2"></i> Delete</button></td>
                         
         
                           </tr> `

    }
    document.getElementById("tableData").innerHTML = addRow


}
function setUpdate(i) {
    index = i
    siteNameInput.value = mainArr[i].site
    siteUrlInput.value = mainArr[i].url
    submitBtn.classList.add("d-none")
    editBtn.classList.replace("d-none", "d-inline-block")



}
editBtn.addEventListener("click", editInputs)
function editInputs() {

    if (validSiteName() == true && validSiteUrl() == true) {

        mainArr[index].site = siteNameInput.value
        mainArr[index].url = siteUrlInput.value
        submitBtn.classList.replace("d-none", "d-inline-block")
        editBtn.classList.replace("d-inline-block", "d-none")

        localStorage.setItem("sites", JSON.stringify(mainArr))
        diplaySites()
        clearFrom()

    }


}
closeBtnIcon.addEventListener("click", function () {
    modal.classList.add("d-none")

})
document.addEventListener("keyup", function (e) {
    if (e.key == 'Escape') {
        modal.classList.add("d-none")
    }

})

modal.addEventListener("click", function () {
    modal.classList.add("d-none")
})
modalInner.addEventListener("click", function (e) {
    e.stopPropagation()
})

function validSiteName() {
    let regx = /^[A-Z][a-z]{2,20}$/
    if (regx.test(siteNameInput.value) == true) {
        siteNameInput.classList.add("is-valid")
        siteNameInput.classList.remove("is-invalid")
        alertValid.classList.replace("d-none", "d-block")
        alertInValid.classList.replace("d-block", "d-none")


        return true

    }
    else {
        siteNameInput.classList.add("is-invalid")
        siteNameInput.classList.remove("is-valid")
        alertInValid.classList.replace("d-none", "d-block")
        alertValid.classList.replace("d-block", "d-none")



        return false
    }

}
siteNameInput.addEventListener("input", validSiteName)

function validSiteUrl() {
    let regx = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/

    if (regx.test(siteUrlInput.value) == true) {

        siteUrlInput.classList.add("is-valid")

        siteUrlInput.classList.remove("is-invalid")

        return true

    } else {
        siteUrlInput.classList.add("is-invalid")
        siteUrlInput.classList.remove("is-valid")

        return false
    }


}
siteUrlInput.addEventListener("input", validSiteUrl)




deletAllButton.addEventListener("click", function () {
    if (editBtn.classList.contains("d-none")) {
        if (mainArr.length == 0) {
            alert("There IS Nothing To Delete")

        }
        else {

            modal2.classList.remove("d-none")
        }


    }
    else {
        alert("how come u want to delete while Updating !!!")

    }


})

deletBtnModal.addEventListener("click", function () {



    mainArr = []
    localStorage.setItem("sites", JSON.stringify(mainArr))
    diplaySites()
    modal2.classList.add("d-none")


})
closeBtnModal.addEventListener("click", function () {
    modal2.classList.add("d-none")

})