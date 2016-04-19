'use strict'

$(document).ready(init)



function init(){
 $('.searchbutton').click(getQotes)
 $('table').on('click', '.trackstock', followstock);
 favoriteStock();

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



  function appendRowTrack(obj){
    console.log(obj);
    var $createrow = $('<tr>');
    var $name = $('<td>').text(obj.Name);
    var $symbol = $('<td>').text(obj.Symbol);
    var $DailyHigh = $('<td>').text(obj.High);
    var $Lastprice = $('<td>').text(obj.LastPrice);
    var button = $('<button>').addClass('trackstock btn').text('Delete')
    $createrow.append( $name,$symbol,  $DailyHigh,$Lastprice,button)
    return $createrow
  }




function followstock(e){
 var slectedStock = $(this).closest('tr').find('.symbolname')[0].textContent;
 // array.push(slectedStock)
 var contacts = contactStorage.get();
    contacts.push(slectedStock);
    contactStorage.write(contacts)
}

function favoriteStock(){
  var contacts = contactStorage.get();
  console.log(contacts);
  for(var i=0;i<contacts.length;i++){
    var storagesymbol = contacts[i]

    $.getJSON(`http://dev.markitondemand.com/MODApis/Api/v2/Quote/jsonp?symbol=${storagesymbol}&callback=?`)
      .done(function(data){
        var searchdata = data;
        $('.trackedresult').append(appendRowTrack(searchdata))
        // console.log(searchdata[i]);
      })
      .fail(function(err){
        console.log('err:', err);
      })

  }
}
