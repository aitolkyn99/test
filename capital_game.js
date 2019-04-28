var country_capital_pairs =  pairs;
var group = []


var happened;
var prevCountryIndex = 0;
var countryIndex = 0;
country_capital_pairs.forEach(function(a) {
	if (!this[a.capital]) {
		this[a.capital] = { capital: a.capital, content: []};
		group.push(this[a.capital]);
	}
	this[a.capital].content.push(a);
}, Object.create(null));
var capitals = []
for (i = 0; i < group.length; i++) {
	capitals.push(group[i].capital);
}
// console.log(group)
// console.log(capitals);
// [{"country":"Afghanistan","capital":"Kabul"}]


$( document ).ready(function() {



var rand = getRandomInt(0, country_capital_pairs.length - 1)

function capitalize (str) {
	return str.split(' ').map(w => w[0].toUpperCase() + w.substr(1).toLowerCase()).join(' ')
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

$( function() {
	$("#pr2__answer").autocomplete({
		source: function(request, response) {
			var matcher = new RegExp($.ui.autocomplete.escapeRegex(request.term), "i");
			response( $.grep(capitals, function(value) {
				value = value.label || value.value || value;
				return matcher.test(value);
			}));
		}
		
	}).keyup(function(e){
		if (e.which === 13) {
			$(".ui-menu-item").hide();
		}
	})
	$('#pr2__answer').autocomplete({
		select: function(event, ui) {
			$('#pr2__answer').val(ui.item.label);

			
			// if (!happened) {			
			
				
			console.log('in autocomplete')
			console.log('happened = ' + happened);
			buttonAction();
				
			
			console.log('back in autocomplete')
			event.preventDefault();
			//$('#pr2__answer').submit();
		}
	})

})
function buttonAction() {
	var answerBox = document.getElementById("pr2__answer")
	
  	var answer = answerBox.value 
  	answerBox.value = "";
  	answer = capitalize(answer);

  	
  	console.log('answerBox.value = ' + answerBox.value);
	
	$("#pr2__answer").focus();
	var country = (document.getElementById("pr2__question").innerHTML);
	// console.log(country);
	

	var markup = ("<td>" + country + "</td>" ) 
	var kek = 0;//checks if the answer was right
	if (capitalize((country_capital_pairs[countryIndex]).capital) == answer) {
		kek = 1
		markup += '<td>' + answer + "</td>"
		markup += '<td> <i class=\"fas fa-check\"></i> <button type = "button"; class = "btnDelete"> Delete </button></td>'
		markup = '<tr class = "correct">' + markup;
	} else {
		markup += '<td class = "incorrectAnswer">' + answer  + "</td>"	
		markup += "<td> " + (country_capital_pairs[countryIndex]).capital + '<button type = "button"; class = "btnDelete"> Delete </button></td>';
		markup = '<tr class = "incorrect">' + markup;
	}
	markup += "</tr>" 
	 console.log(markup);
	$("#content tr").eq(2).after(markup);

	if((document.getElementById('answersCorrect').checked && kek == 0)|| (document.getElementById('answersWrong').checked && kek == 1)) {
			document.getElementById('answersAll').checked = true;
			updateSettings('answersAll', 1);
	}
	$("#content").on('click','.btnDelete',function(){
       $(this).closest('tr').remove();
     });
  		
	prevCountryIndex = 1;
	getQuestion();	
}

 




function bindEvents() {
	var btn = document.getElementById("pr2__submit") 
    btn.onclick = buttonAction;
    var markup = ' <tr id = "selected"> \n <form action = "">\n';
    markup += '<td><label for = "answersAll"><input type = "radio" name = "answers" id = "answersAll" value = "All" checked = "checked">All<br></label> </td>'
    markup += '<td><label for = "answersCorrect"><input type = "radio" name = "answers" id = "answersCorrect" value = "Correct Only">Correct Only<br></label></td>'
    markup += '<td><label for = "answersWrong"><input type = "radio" name = "answers" id = "answersWrong" value = "Wrong only"> Wrong Only <br> </label></td>'
    markup += '</form>\n'
    markup += '</tr>'
    
    console.log(markup)
    $("#content tr").eq(1).after(markup);

}

document.onkeyup = function(e) {

	if (e.which == 13) {
		//  console.log('in enter:')
		
		// if (prevCountryIndex == 0) {
		// 	console.log("from_enter\n")
		// 	happened = true;
			buttonAction();
		// }
		// console.log('back in enter')
		// var answerBox = document.getElementById("pr2__answer")
		// answerBox.value = "";
		
	}
}



function getQuestion() {
	prevCountryIndex = 0;
	var question = document.getElementById("pr2__question")
	happened = false;
	console.log('start in getQuestion: happened =' + happened);
	countryIndex = getRandomInt(0, country_capital_pairs.length - 1)
	question.innerHTML = (country_capital_pairs[countryIndex]).country;
}
/*
function checkRadios() {
	if (document.getElementById('answersAll'.checked())
}*/

$(function(){
	$('#selected label').click(function() {
	
		 updateSettings($(this).attr('for'), $('#'+$(this).attr('for')).val());
	});
});


function updateSettings(clicked,value){
    //alert('clicked : ' +clicked+' ,Value:- '+value);
    var a = (document.getElementById('answersAll').checked == true);
    var b = (document.getElementById('answersCorrect').checked == true);
    var c =(document.getElementById('answersWrong').checked == true);
    console.log('a = ' + a)
    console.log('b = ' + b)
    console.log('c = ' + c + "\n\n")
    if (clicked == 'answersAll') {
    	console.log('answersAll')
    	$(".correct").show();
    	$(".incorrect").show();
    }
	if (clicked == 'answersCorrect') {
		console.log('answersCorrect')
		$(".incorrect").hide();
		$(".correct").show();
	}
    if (clicked == 'answersWrong' ) {
    	console.log('answersWrong')
    	$(".correct").hide();
    	$(".incorrect").show();
    }
 /*
    	var a = (document.getElementById('answersAll').checked == true);
    	var b = (document.getElementById('answersCorrect').checked == true);
    	var c =(document.getElementById('answersWrong').checked == true);
    	if (a)
    	   	$(".correct").show();
 		   	$(".incorrect").show();
 		if (b)
 			$(".correct").show();
 			$(".incorrect").hide();
 		if (c)
 			$(".correct").hide();
 			$(".incorrect").show();*/

}

$("#pr2__answer").focus();

getQuestion();
bindEvents()


// addContentToRow(lastRow);
	  
  
  

});
