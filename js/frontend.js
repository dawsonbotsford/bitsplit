function encode(url, doc) 
{
    window.location.href = url + "?" + doc.amount_field.value;
}
function new_page(url) 
{
    window.location.href = url;
}
function build_owe_json(objects){

   var jsonret = "{";
   $.get("../test", function (data) {
     jsonret += "[pubkey: " + data + "\npaid: 99999], ";
   }); 

  $('#friendlist .btn-info').each(function() {
    jsonret += "[ pubkey: " + $(this).attr('data-pubkey') +"\npaid: 0],";
  });
    jsonret = jsonret.substring(0, jsonret.length - 1) + "}";
  alert(jsonret);
}
