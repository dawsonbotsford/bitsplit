function encode(url, doc)
{
    window.location.href = url + "?" + doc.amount_field.value;
}
function new_page(url)
{
    window.location.href = url;
}
function prep_invoice(objects, total){

    var send_pub = getCurrentUser().publicKey; 
   /*$.get("../test", function (data) {
     jsonret += "[pubkey: " + data + "\npaid: 99999], ";
   });
*/
  var numsplitters = $('#friendlist .btn-info').length + 1;
  var owedper = parseInt(total/numsplitters);
  $('#friendlist .btn-info').each(function() {
    //jsonret += "[ " + $(this).attr('data-pubkey') + "],";
    //jsonret += "[ pubkey: " + $(this).attr('data-pubkey') +"\npaid: 0],";
    debugger
    var myobj = { receiver_publicKey: $(this).attr('data-pubkey').toString(), sender_publicKey.toString(): send_pub, amount: owedper }; 
    $.post("../invoice", myobj, function(response) {
      alert("Response: " + response);
    }); 
  //alert("Each person owes" + owedper + " USD");
  });
  //{"message": "Hackathon", "receiver_publicKey": "mhurFvrky29ib6VshzZk6V9tUFeBHr5Sh3", "amount": 50000, "sender_publicKey":"mjXX5eKz72g1rKzw4fEDZgVeWLpADeS42P"}
  //jsonret = jsonret.substring(0, jsonret.length - 1);
   // return jsonret + "}";
}
