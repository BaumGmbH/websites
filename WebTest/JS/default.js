// Element löschen
$("#zettel").on('click', '.del-item', function(){
    $(this).closest("li").remove();
});

// Element hinzufügen
$("#tut_btn").on('click', function(){
    var text = $("#tut_txt").val();
    
    if (text.length === 0) {
        
    } else {
        $("#zettel").append("<li> "+ text +" <input class='del-item' type='submit' value='x'></li>")
    }
});

// Sektionen ein/ausblenden

$("#nav_list li a").click(function(e){
    e.preventDefault();
    
    var section = $(this).attr("href");
    $("section").removeClass("section-active");
    $(section).addClass("section-active");
    $("#nav_list li a").removeClass("tab-active");
    $(this).addClass("tab-active");
})