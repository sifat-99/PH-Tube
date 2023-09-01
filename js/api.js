const loadMenu = async () => {
    const res = await fetch(`https://openapi.programming-hero.com/api/videos/categories`);
    const data = await res.json();
    // console.log(data.data)
    displayMenu(data.data);
}
function displayMenu(data)
{
    const menu = document.getElementById('menu-items')
for(let i=0; i<data.length; i++)
{
    const menuListName = data[i].category;
    const menuListId = data[i].category_id;
    const button = document.createElement('button');
if(menuListId==1000)
{
    button.innerHTML = `
    <a class="px-4 py-4" id="${menuListId}" onclick="btnClicked(this)" >${menuListName}</a>
    `
}
else
{
    button.innerHTML = `
    <a class="px-4 py-4" id="${menuListId}" onclick="btnClicked(this)" >${menuListName}</a>
    `
}


    
    button.classList.add('p-4','text-black','rounded-md','bg-[#25252526]',);
    menu.appendChild(button);
}
}
const btnShortByView = document.getElementById("sort-button");

const loadContent = async (buttonID)=>{
    const response = await fetch (`https://openapi.programming-hero.com/api/videos/category/${buttonID}`)
    const dataContainer = await response.json();

    const watchTime = dataContainer.data;
    showCard(dataContainer.data,buttonID)
    // showCard(watchTime);
    // console.log(watchTime)

    btnShortByView.addEventListener('click',()=>{
        sortByView(watchTime);
        // console.log(watchTime)
        showCard(watchTime);
    })
    
    
}
// Sort by date Function 

const sortByView = data => {
    document.getElementById('card-container').innerHTML = '';
    data.sort(function (a, b) {
        return parseFloat(b.others.views) - parseInt(a.others.views);
    });
    // showCard(data);
  }



function showCard(card,buttonID)
{
    const dataContainerCard = document.getElementById('card-container');
    const dataContainerCard2 = document.getElementById('card-empty-container');
    dataContainerCard.textContent = ' ';
    dataContainerCard2.textContent = ' ';

    if(buttonID==1005)
    {
        // console.log(dataContainerCard2.innerHTML)
        const div = document.createElement('div');
        div.classList.add('w-full','items-centre','justify-centre','container','h-auto');
        div.innerHTML = `
        <div class="p-2 container flex items-center justify-center">
                <div class="flex flex-col items-center gap-3">
                <img class="" src="../image/Icon.png"alt="" />
                <h2 class="text-3xl font-bold">Oops!! Sorry, There is no content here</h2>
                </div>
        `
        dataContainerCard2.appendChild(div);
    }
    else if(card.length > 0)
    {
        card.forEach(card => {
        const div = document.createElement('div');
        div.classList.add('card','card-compact','width-auto','rounded-lg','bg-[#25252526]','shadow-xl');
        div.innerHTML = `
        <figure class="relative"><img class="h-[200px] w-full" src="${card.thumbnail}" alt="Shoes" />
        <div class="absolute right-1 bottom-1 border border-none bg-black text-white px-2 rounded-md text-[10px] font-normal">${secondsToHms(card.others.posted_date) }</div>
        </figure>
        <div class="card-body p-2">
                <div class="flex  gap-3">
                <img class="w-10 h-10 rounded-full" src="${card?.authors[0]?.profile_picture}"alt="" />
                <div class="grid gap-3">
                <h2 class="text-[16px] font-bold">${card?.title}</h2>
                <div class= "grid grid-flow-col gap-2">
                <p class="w-auto flex gap-3 text-[#171717B3]">${card?.authors[0]?.profile_name} ${card.authors[0]?.verified?'<img src="../image/verified.png"': ' '} </p>
                </div>
                <p class="text-[#171717B3]">${card?.others.views}</p>
        </div>
                
                </div>
                </div>
                
        `
        dataContainerCard.appendChild(div);
        });
    }
    
}
function btnClicked(button)
{
    const buttonID = button.id;
        loadContent(buttonID);
    const buttonBox = document.getElementById(buttonID)
}
function secondsToHms(posted_date) {
    number = Number(posted_date);
    const hours = Math.floor(number / 3600);
    const minutes = Math.floor(number % 3600 / 60);
    const hourDisplay = hours > 0 ? hours + (hours == 1 ? " hour, " : " hours ") : "";
    const minutesDisplay = minutes > 0 ? minutes + (minutes == 1 ? " minute, " : " minutes ago") : "";
    return hourDisplay + minutesDisplay ;
}

loadContent(1000);

loadMenu();


