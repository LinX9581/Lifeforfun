var tabCount=0;	//動態div
var $getID = $('input[name="getId"]').val();

$('#searchBtn, #idConfirm').click(function(){
	//搜尋ID
	if(this.id == 'searchBtn')
	{
		//空值
		if($('input[name="getId"]').val()=="")
		{
			$("button").removeAttr("data-remodal-target");
			alert("請輸入ID");
		}
		//#idConfirm.click寫在else裡面 function會重複發生 
	}
	if(this.id == 'idConfirm')
	{
		var $getID = $('input[name="getId"]').val();
		$.ajax({
			url: "php/ID_check.php",
			data: "&getId="+$getID,	//前面的"&getId=" 是input的name
			type:"POST",
			success: function(result1){

				if(result1==0)
				{
					alert("查無此ID");	
				}
				
				else if(result1==1)
				{
					$("#addFriendDiv").append('<div class="friendDiv" id="div' + tabCount + '" tabindex="' + tabCount + '" test=$getID></div>');
					tabCount++;			
				}
			}
		});		
	}
	//有值的話 可能會回首頁
});
