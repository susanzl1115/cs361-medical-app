
var searchCharname = function (e) {
    e.preventDefault();

    var insurance_identification = $('#identification').val();

    var obj = { 'identification': insurance_identification };
    console.log(obj);
    $.ajax({
        dataType: 'json',
        type: 'POST',
        url: '/search_name',
        data: obj,
        success: function (data) {
            var results = data.results;
            $('#search_result_byname').html('');
            for (var i = 0; i < results.length; i++) {
                var str = '<li>' + results[i].provider_name + ' ' + results[i].practitioner_name + '</li>';
                $('#search_result_byname').append(str);
            }
        }
    });
};

var render = function () {
    $('#searchbyname').on('click', searchCharname);
};

jQuery(document).ready(function ($) {
    render();
});

document.addEventListener("DOMContentLoaded", function (event) {

    var btns = document.getElementsByClassName("add-btn");
    console.log(btns);
    var tables = document.getElementsByClassName("add-tables");
    for (var i = 0; i < btns.length; i++) {
        console.log("this code is hit");
        btns.item(i).addEventListener("click", function (event) {
            var paren = btns.item(i).parentElement;
            var table = paren.querySelector(".add-table");
            var newHtml = table.querySelector("input").outerHTML;
            var temp = document.createElement("div");
            temp.innerHTML = newHtml;
            table.appendChild(temp.firstElementChild);
        });
    }
});

