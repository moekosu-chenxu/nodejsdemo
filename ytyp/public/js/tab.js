function myTabs(){
			var myTabs = $('.group_my_tab li');
			var myconts= $('.group_record ul');
			myTabs.click(function(){
				$(this).addClass('up').siblings().removeClass(); 
				myconts.hide().eq(myTabs.index(this)).show(); 
				$('.group_record ul').first('ul').show();
			});	
		}
		myTabs();
		
		function recTabs(){
			var recTabs = $('.group_my_tab li');
			var recconts= $('.group_record ul');
			recTabs.click(function(){
				$(this).addClass('up').siblings().removeClass(); 
				recconts.hide().eq(recTabs.index(this)).show(); 
			});	
		}
		recTabs();