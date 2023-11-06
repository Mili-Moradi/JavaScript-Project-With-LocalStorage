
"use strict"
// --------------------------------------------------------------------------
//   HTML Datei für Projekt Mili Moradi 
// -------------------------------------------------------------------------------

// --------------------------------------------------------------------------
// benötigte Elemente im DOM referenzieren
// --------------------------------------------------------------------------
const add = document.querySelector("#add-book");
const liste_bucher = document.querySelectorAll("#book-list");
const eingabe_text = document.querySelector("#text_input");
const submit_knopfe = document.querySelector("#submit_input");
const search_input = document.querySelector(".search");
const par = document.querySelector("ul.parent");
let editItem = null;

// --------------------------------------------------------------------------
// Event für DOMContentLoaded registrieren
// --------------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', function(e){
    update();   
})

// --------------------------------------------------------------------------
// Event für Submit-button-click registrieren
// ----------------------------------------------------------------------------
add.addEventListener('submit', (e) => {
    e.preventDefault();
    const eingabe = eingabe_text.value; // input-values auslesen

    // Messages für Erfolg und Fehler
    if(!eingabe){
        alert("Please enter the Books name!");
    return;
}
    
    let books = getAllBooks();      // Storage abfragen
    
    storeToLocalStorage(eingabe);   // Wert im localStorage speichern
    createLi(eingabe);              // input-values übergeben um neues HTML-Element anlegen

    eingabe_text.value = "";
});

// ------------------------------------------------------------------------------------------
//  Li Button erzeugen mit Event-Function
// --------------------------------------------------------------------------------------------
function createLi(eingabe) {
    let li = document.createElement("li");   //neues HTML-Element anlegen
    li.title = eingabe;

    // DOM-Teilbaum erzeugen und integrieren
    par.appendChild(li);
    li.appendChild(document.createTextNode(eingabe));
    createButtonDelete(li);
    createButtonEdit(li);

    return li;
}
// ------------------------------------------------------------------------------------------
// Delete Button erzeugen mit Event-Function & Event für Delete-button-click registrieren
// --------------------------------------------------------------------------------------------
function createButtonDelete(li) {
    let b_delete = document.createElement('button'); //neues HTML-Element anlegen

    b_delete.className = 'delete';
    b_delete.innerText = 'Delete'; 

    // DOM-Teilbaum erzeugen
    li.appendChild(b_delete);  

    // EventListener
    b_delete.addEventListener('click', (e) => {
    
        e.target.parentElement.remove();  
        removeFromLocalStorage(li);
    });

    return b_delete;
}
// ----------------------------------------------------------------------------------------
// Edit Button erzeugen mit Event-Function & Event für Edit-button-click registrieren
// ----------------------------------------------------------------------------------------
function createButtonEdit(li) {
    let b_edit = document.createElement('button'); //neues HTML-Element anlegen
    b_edit.className= 'edit';
    b_edit.innerText = 'Edit';

    // DOM-Teilbaum erzeugen
    li.appendChild(b_edit);

    // EventListener
    b_edit.addEventListener('click', (e) => {
        eingabe_text.value = e.target.parentNode.childNodes[0].data;    // parentNode li -> chilNodes[0]-> name des Buches 
        submit_knopfe.value = "Edit";       // DOM manipuliren
        e.target.parentElement.remove();    // li wird gelöscht
        removeFromLocalStorage(li);         // von Localstorage löschen
    });
 
    submit_knopfe.value ="Add Book";        // DOM manipuliren
    return b_edit;
}
     
/// --------------------------------------------------------------------------
// storeToLocalStorage  aktuellen Stand in localStorage speichern
//----------------------------------------------------------------------------
function storeToLocalStorage(book){
    let books = getAllBooks();
    books.push(book);                                           // Add to localStorage
    localStorage.setItem("books", JSON.stringify(books));           // Before save array in localStorage=> convert it to string
}                                                                   //stringify() =>  convert the array into a string

// --------------------------------------------------------------------------
// removeFromLocalStorage
//----------------------------------------------------------------------------
function removeFromLocalStorage(book){   
    let books= getAllBooks();
    
    for(let i=0; i<books.length; i++){
        
        if(books[i] === book.title){
            books.splice(i, 1);                                         // wird von Array gelöscht
            localStorage.setItem("books", JSON.stringify(books));       // aktuelle zustand wird wieder gespeichert
        }
    }
}
// --------------------------------------------------------------------------
// function getAllBooks()  aktuellen Stand aus localStorage abfragen
//----------------------------------------------------------------------------
function getAllBooks(){

	let books = JSON.parse(localStorage.getItem("books"));  // the array from the localStorage is a string => need to convert it to an array to manipulate it
                                                            //=> parse()JavaScript array
   
    if(!books){                  // prüfen, ob Storage verfügbar    
        return[];                // wenn nicht verfügbar einlegen
    }
    else{
        return books;           // wenn verfügbar Storage abfragen
    }
}

// // -----------------------------------------------------------------------------
// Funktion für Search erzeugen
// // -------------------------------------------------------------------------------

search_input.oninput = searchbook; 

function searchbook() {
    let books = getAllBooks();
    let count = books.length;
    const search_text = search_input.value.trim().toLowerCase(); 

    for (let i = 0; i < count; i++) {
        let buch = par.children[i];
        let buchname = buch.title.toLowerCase();

        if (!search_text || buchname.includes(search_text)) {
            buch.style.display ="flex"; // Inline-Style setzen
        }
        else {
            buch.style.display ="none"; // Inline-Style setzen
        }       
    }
}

// -------------------------------------------------------------------------------------
// Function update()  aktuellen Stand  abfragen ,in localStorage speichern und die Seite neu anlegen
// -------------------------------------------------------------------------------------
function update(){

    let books= getAllBooks();
    for(let book of books){     
        console.log(book);
        createLi(book);
        }
}
// // // -----------------------------------------------------------------------------------------------

// // //-----------------------------------------------------------------------------------------------



