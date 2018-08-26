window.onload = function(){
	// Buttons
	var quickAddBtn, quickAddFormDiv, cancelBtn, AddBtn, letters;
	quickAddBtn = document.getElementById('QuickAdd');
	quickAddFormDiv = document.querySelector('.quickaddForm')
	cancelBtn = document.getElementById('Cancel');
	AddBtn = document.getElementById('Add');
	letters = document.getElementById('letters');

	// Form Fields
	var fullname, phone, address, fonction, email;
	fullname = document.getElementById('fullname');
	phone = document.getElementById('phone');
	address = document.getElementById('address');
	fonction = document.getElementById('fonction');
	email = document.getElementById('email');
	
	// Divs etc.
	var addBookDiv = document.querySelector('.addbook');

	quickAddBtn.addEventListener("click", function(){
		// display the form div
		quickAddFormDiv.style.display = "block";
	});

	cancelBtn.addEventListener("click", function(){
		quickAddFormDiv.style.display = "none";
	});

	AddBtn.addEventListener("click", addToBook);

	addBookDiv.addEventListener("click", editEntry);

	addBookDiv.addEventListener("click", removeEntry);

	// Storage Array
	var addressBook = [];

	function jsonStructure(fullname,firstname,phone,fonction,email){
		this.fullname = fullname;
		this.firstname = firstname;
		this.phone = phone;
		this.fonction = fonction;
		this.email = email;
	}

	function addToBook(){
		var isNull = fullname.value!='' && firstname.value!='' && phone.value!='' && fonction.value!='' && email.value!='';
		if(isNull){
			// format the input into a valid JSON structure
			var obj = new jsonStructure(fullname.value,firstname.value,phone.value,fonction.value,email.value);
			addressBook.push(obj);
			localStorage.setItem('addbook', JSON.stringify(addressBook));
			quickAddFormDiv.style.display = "none";
			clearForm();
			showAddressBook();
		}
	}

	/*function editEntry(e){
		// Remove an entry from the addressbook
		if(e.target.classList.contains('delbutton')){
			var editID = e.target.getAttribute('data-id');
			addressBook.splice(editID,1);
			localStorage['addbook'] = JSON.stringify(addressBook);
			showAddressBook();
		}
	}*/

	function removeEntry(e){
		// Remove an entry from the addressbook
		if(e.target.classList.contains('delbutton')){
			var remID = e.target.getAttribute('data-id');
			addressBook.splice(remID,1);
			localStorage['addbook'] = JSON.stringify(addressBook);
			showAddressBook();
		}
	}

	function clearForm(){
		var formFields = document.querySelectorAll('.formFields');
		for(var i in formFields){
			formFields[i].value = '';
		}
	}

	function showAddressBook(){
		if(localStorage.getItem('addbook') === undefined){
			addbook = '';
		} else {
			addressBook = JSON.parse(localStorage.getItem('addbook'));
			// Loop over the array addressBook and insert into the page
			addBookDiv.innerHTML = '';
			for(var n in addressBook){
				var str = '<div class="entry">';
					str += '<div class="name"><p>' + addressBook[n].fullname + '</p></div>';
					str += '<div class="firstname"><p>' + addressBook[n].firstname + '</p></div>';
					str += '<div class="email"><p>' + addressBook[n].email + '</p></div>';
					str += '<div class="phone"><p>' + addressBook[n].phone + '</p></div>';
					str += '<div class="fonction"><p>' + addressBook[n].fonction + '</p></div>';
					str += '<div class="edit"><a href="#" class="editbutton" data-id="' + n + '">Edit</a></div>';
					str += '<div class="del"><a href="#" class="delbutton" data-id="' + n + '">Delete</a></div>';
					str += '</div>';
				addBookDiv.innerHTML += str;
			}
		}
	}

		showAddressBook();

}

	function mySearch() {
	var input, filter, book, divSearch, nameSearch, i;
	input = document.getElementById("myInput");
	filter = input.value.toUpperCase();
	book = document.getElementById("addbook");
	divSearch = book.getElementsByTagName("div");
	for (i = 0; i < divSearch.length; i++) {
	nameSearch = divSearch[i].getElementsByClassName("name")[0];
	if (nameSearch) {
		  if (nameSearch.innerHTML.toUpperCase().indexOf(filter) > -1) {
		    divSearch[i].style.display = "";
		  } else {
		    divSearch[i].style.display = "none";
		  		}
			}       
		}
	}