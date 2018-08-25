window.onload = function(){
	// Buttons
	var quickAddBtn = document.getElementById('QuickAdd');
	var quickAddFormDiv = document.querySelector('.quickaddForm')
	var cancelBtn = document.getElementById('Cancel');
	var AddBtn = document.getElementById('Add');
	// Form Fields
	var fullname = document.getElementById('fullname');
	var phone = document.getElementById('phone');
	var address = document.getElementById('address');
	var fonction = document.getElementById('fonction');
	var email = document.getElementById('email');
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

	function removeEntry(e){
		// Remove an entry from the addressbook
		if(e.target.classList.contains('delbutton')){
			var remID = e.target.getAttribute('data-id');
			addressBook.splice(remID,1);
			localStorage.removeItem('addbook', JSON.stringify(addressBook));
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