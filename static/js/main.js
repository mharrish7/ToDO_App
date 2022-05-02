

$('.form').on('submit',function(e){
    $.ajax({
        data : {
            title : $('#title').val(),
            content : $('#content').val()
        },
        type : 'POST',
        url : '/add'
    }).done(function(data){
        if (data.id){
            t = data['title'];
            c = data['content'];
            id = data['id'];
            cl = "d "+id;
            bl = "dele "+id +" btn btn-success";
            $('.main').append('<h2 class = "'+cl+'">'+t+"</h2>");
            $('.main').append('<p class = "'+cl+'">'+c+"</p>");
            $('.main').append('<button class = "'+bl+'">'+"Done"+"</button>");
            $('.main').append('<hr class = "h '+id +'">');
        }
        else{
            console.log('hel');
        }
    });
    e.preventDefault();
});


$(".del").on('click',function(){
    $.ajax({
        data : '',
        url : '/del',
        type : 'POST'
    }).done(function(){
        $('.d').remove();
        $('.dele').remove();
        $('.h').remove();
    })
})

$(".dele").on('click',function(){
    var id = $(this).attr('class');
    $.ajax({
        url : '/done',
        data : {'id' : id},
        type : 'POST',
    }).done(function(dat){
        if(dat['suc']){
            $('.'+ dat['suc']).remove();
        }
    })
})

$("body").on("click",".dele", function(){
    var id = $(this).attr('class');
    $.ajax({
        url : '/done',
        data : {'id' : id},
        type : 'POST',
    }).done(function(dat){
        if(dat['suc']){
            $('.'+ dat['suc']).remove();
        }
    })
 });