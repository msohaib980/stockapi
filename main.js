'use strict'

$(document).ready(init)



function init(){
 $('.searchbutton').click(getQotes)
 $('table').on('click', '.trackstock', followstock)
}

function getQotes(){
  var $searchinput = $('.searchinput').val();
  $.getJSON(`http://dev.markitondemand.com/MODApis/Api/v2/Lookup/jsonp?input=${$searchinput}&callback=?`)
    .done(function(data){
      var searchdata = data;
      for(var i=0;i<searchdata.length;i++){
          $('.searchresult').append(appendRow(searchdata[i]))
      }
    })
    .fail(function(err){
      console.log('err:', err);
    })
}

function appendRow(obj){
  var $createrow = $('<tr>');
  var $exchange = $('<td>').text(obj.Exchange);
  var $name = $('<td>').text(obj.Name);
  var $symbol = $('<td>').addClass('symbolname').text(obj.Symbol);
  var button = $('<button>').addClass('trackstock').text('Track Stock')
  $createrow.append($exchange, $name,$symbol, button)
  return $createrow
}

// local storage
var contactStorage = {
    get: function() {
      try {
        var contacts = JSON.parse(localStorage.contacts);
      } catch(err) {
        var contacts = [];
      }
      return contacts;
    },
    write: function(contacts) {
      localStorage.contacts = JSON.stringify(contacts);
    }
  };

//   var contacts = contactStorage.get();
//   contacts.push(contact);
//   contactStorage.write(contacts)
// }

function followstock(e){
  e.stopPropagation();
  

}
