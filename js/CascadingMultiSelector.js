
function CascadingMultiSelector(elementBodySelector, collection)
{
	var multiSelectorIndetifier = "01";
	var primarySelectorID = "primarySelector" + multiSelectorIndetifier;
	var secondarySelectorID = "secondarySelector" + multiSelectorIndetifier;
	var selectedItems = [];
	var unSelectedItems = collection;
	
	elementBodySelector = jQuery(elementBodySelector);
	elementBodySelector.attr("cascadingMultiSelector", "true");

	//Constructors
	buildElementsSelector(elementBodySelector);
	
	bindHtmlLists();
	//bindCollection();
	bindEvents();
	
	function buildElementsSelector(elementBodySelector)
	{
		var multiSelectorIndetifier = 0;
		
		var htmlBodySelector = "<ul id='"+primarySelectorID+"' class='primarySelector'>																\
								</ul>																							\
								<div id='buttonsSelector"+multiSelectorIndetifier+"' class='cascadingMultiSelectorButtons'>		\
									<input type='button' id='"+multiSelectorIndetifier+"' value='<<'></input>					\
									<input type='button' id='"+multiSelectorIndetifier+"' value='>>'></input>					\
								</div>																							\
								<ul id='"+secondarySelectorID+"' class='secondarySelector'>																\
								</ul>																							\
							</div>";
							
		 elementBodySelector.append(htmlBodySelector);
	}
	
	
	//PRIVATE FUNCTIONS
	function bindEvents()
	{
		jQuery(elementBodySelector).find("ul").find("li").click(function(){
			listItemClick(this);
		});		
		
		jQuery(elementBodySelector).find("ul").click(function(e){
			e.stopPropagation();
		});
	}
	
	function bindHtmlLists()
	{
		elementBodySelector.find("#"+primarySelectorID).append(buildHtmlCollection(unSelectedItems));
		elementBodySelector.find("#"+secondarySelectorID).append(buildHtmlCollection(selectedItems));	
	}
	
	function buildHtmlCollection(collection)
	{
		var listHtml = "";
		
		for(var i=0;i<collection.length;i++)
		{
			if(collection[i].childrens !== null && collection[i].childrens.length <=0)
			{
				listHtml += buildListItemLI(collection[i].key,collection[i].value);
			}
			else if(collection[i].childrens !== null && collection[i].childrens.length > 0)
			{
				listHtml += buildListItemLI(collection[i].key,collection[i].value);
				listHtml += buildListItemLI(collection[i].key, buildListUL(buildHtmlCollection(collection[i].childrens)));
			}	
		}
		
		return listHtml;
	}
	
	
	function buildListUL(elementsLI)
	{
		var elementUL = "<ul>"+elementsLI+"</ul>";
		return elementUL;
	}
	
	function buildListItemLI(key,value)
	{
		var elementLI = "<li key='"+key+"' class='listItemSelector'>"+value+"</li>";
		return elementLI;
	}
	
	
	//EVENTS
	function listItemClick(element)
	{
		element = jQuery(element);
		
		element.css("background","blue");
		element.css("color","white");
	}
	
}
