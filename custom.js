var currentUrl = window.location.href;

 if (true) { // Временно всегда истинно для отладки
  
    // Setting's shop
    const event = new CustomEvent("setCustomConfig")
    
    window.productsGrid = 4;
    window.currency = '₽';
    window.defaultPaymentAmount = 100;
    window.zeroToFree = true;
  	hideServerSelector = true;
  	hideTotalOnline = true;
  	sidebarStoreToRight = true;
    newYearVibe = false;

    window.dispatchEvent(event);
  
  	if (window.innerWidth > 670) {
        function shopHeader() {
          
            window.dispatchEvent(new CustomEvent("initState"));
            window.dispatchEvent(new CustomEvent("initComponentsManager"));

            window.componentsManager.addListener('HEADER', 'DID_MOUNT', () => {
                function addNewHeader() {
                    const htmlCode = `<header class="Header-module__custom">
                                          <div class="HeaderButtons-module">
                                              <a href="#" class="HeaderButtons-module__container Container__promo" onclick="openModal('promoModal')">
                                                  <div class="content__image">
                                                      <img src="https://gspics.org/images/2024/02/16/0btm9m.png" alt="Промокод">
                                                  </div>
                                                  <div class="content__text">
                                                      <p>Промокоды</p>
                                                  </div>
                                              </a>
                                              <a href="#" class="HeaderButtons-module__container Container__bonus" onclick="openModal('bonusModal')">
                                                  <div class="content__image">
                                                      <img src="https://gspics.org/images/2024/02/16/0btUSJ.png" alt="Бонусы">
                                                  </div>
                                                  <div class="content__text">
                                                      <p>Бонусы при пополнении</p>
                                                  </div>
                                              </a>
                                          </div>
                                      </header>`

                    const headerElement = document.getElementsByTagName('header')[0];
                    headerElement.insertAdjacentHTML('beforebegin', htmlCode);

                    const { player } = window.getState().player
                    console.log(player);
                    if (!player) return

                    const userAvatar = `
                        <div class="PlayerMenu-module__avatar">
                            <a href="/profile"> 
                                <img src="${player.avatar}" alt="${player.username}"></img>
                            </a>
                        </div> `

                    const profileLink = document.querySelector('.PlayerMenu-module__profileLink')
                    if (profileLink) {
                        profileLink.outerHTML = userAvatar
                    }

                    const currentURL = new URL(window.location.href);
                    const path = currentURL.pathname;
                    const firstLink = document.querySelector('.HeaderNav-module__wrapper a');

                    if (path === '/' || path === '') {
                        firstLink.classList.add('HeaderNav-module__linkActive');
                    } else {
                        firstLink.classList.remove('HeaderNav-module__linkActive');
                    }
                }

                function editElement() {
                    const loginLink = document.querySelector('.PlayerMenu-module__loginLink');
                    const header = document.querySelector('.Header-module__custom');
                    const playerBalanceBtn = document.querySelector('.PlayerBalance-module__btn');
                    const playerMenuProfileLink = document.querySelector('.PlayerMenu-module__avatar');

                    if (loginLink) {
                        loginLink.innerHTML = `<p>Авторизация</p>`;
                        header.appendChild(loginLink);
                    }

                    if (playerBalanceBtn && playerMenuProfileLink) {
                        const headerLinksContainer = document.createElement('div');
                        headerLinksContainer.classList.add('HeaderLinks-module');
                        headerLinksContainer.appendChild(playerBalanceBtn);
                        headerLinksContainer.appendChild(playerMenuProfileLink);
                        header.appendChild(headerLinksContainer);
                    }
                  
                    var button = document.querySelector(".PlayerMenuMobile-module__profileLink");
                    if (button) {
                      button.classList.remove("PlayerMenuMobile-module__profileLink");
                      button.classList.add("profileLink");
                      button.innerHTML = "Профиль";
                    }
                }

                addNewHeader(); editElement(); // Function
            })

            window.componentsManager.load()
        }
    } else {
        function shopHeader() {
            window.dispatchEvent(new CustomEvent("initState"));
            window.dispatchEvent(new CustomEvent("initComponentsManager"));

            window.componentsManager.addListener('HEADER', 'DID_MOUNT', () => {
              
                function editElement() {
                    var button = document.querySelector(".PlayerMenuMobile-module__profileLink");
                    if (button) {
                      button.classList.remove("PlayerMenuMobile-module__profileLink");
                      button.classList.add("profileLink");
                      button.classList.add("PlayerBalance-module__wrapper");
                      button.innerHTML = "Профиль";
                    }
                }

                editElement(); // Function
            })

            window.componentsManager.load()
        }
    }

    // Component's
    function addFooterLink() {
    window.dispatchEvent(new CustomEvent("initState"));
    window.dispatchEvent(new CustomEvent("initComponentsManager"));

    window.componentsManager.addListener('SHOP_PAGE', 'DID_MOUNT', () => {
        function addPersonalInfoBlock() {
            const htmlCode = `
                <div class="container personalInfoContainer">
                   <p class="infoLine"></p>
                </div>`;
            
            const footer = document.querySelector("footer") || document.querySelector(".ShopFooter-module__links").parentNode;

            if (footer && !document.querySelector(".personalInfoContainer")) {
                footer.insertAdjacentHTML("beforebegin", htmlCode);
            }
        }

        addPersonalInfoBlock(); // Add the personal info block
    });

    window.componentsManager.load();
}
  	function shopMainPage() {
        window.dispatchEvent(new CustomEvent("initState"));
        window.dispatchEvent(new CustomEvent("initComponentsManager"));

        window.componentsManager.addListener('SHOP_PAGE', 'DID_MOUNT', () => {
            function addNewsBlock() {
            	const htmlCode = `<div class="container newsContainer">
                                      <div class="News-module__container news__promo">
                                          <p class="title"><span>ПРОМОКОД КАЖДЫЙ ВАЙП</p>
                                          <p class="description">Вайпы происходят каждую пятницу 16:00 по мск</p>
                                          <a target="_blank" href="https://t.me/REDRUSTic" class="custom__btn">Узнать промокод</a>
                                      </div>
                                      <div class="News-module__container news__24h">
                                          <p class="title"><span>АКТУАЛЬНЫЕ НОВОСТИ ПРОЕКТА</p>
                                          <p class="description">На нашем оффициальном Discord канале</p>
                                          <a target="_blank" href="https://discord.gg/mCQDXupkE9" class="custom__btn">Узнать новости</a>
                                      </div>`;
              
                const mainElement = document.querySelector("main");
                const existingElement = mainElement.querySelector(".newsContainer");


                if (!existingElement) {
                    mainElement.insertAdjacentHTML("beforebegin", htmlCode);
                }
            }
          
          	function editElement() {
                const categoriesContainer = document.querySelector('.Categories-module__categories');
                const serversModule = document.querySelector('.Servers-module__servers');
                const searchWrapper = document.querySelector('.Search-module__wrapper');

                if (categoriesContainer && serversModule && searchWrapper) {
                    const modulesContainer = document.createElement('div');
                    modulesContainer.classList.add('Modules-container');

                    categoriesContainer.parentNode.insertBefore(modulesContainer, categoriesContainer);

                    modulesContainer.appendChild(serversModule);
                    modulesContainer.appendChild(searchWrapper);
                }
              
              	
            }
          
          	function addElement() {
            	const spanElement = document.querySelector('.Product-module__price > span:not([class])');

                if (spanElement) {
                        const spanElements = document.querySelectorAll('.Product-module__price > span:not([class])');

                        spanElements.forEach(spanElement => {
                          spanElement.classList.add('span__price');

                          const imgElement = document.createElement('img');
                          imgElement.src = 'https://gspics.org/images/2024/02/18/0b3QQN.png';
                          imgElement.alt = 'Корзина';

                          spanElement.prepend(imgElement);
                    });
                }
            }
          
          	function addModalPromo() {
            	const htmlCode = `<div role="presentation" onmousedown="document.querySelector('#promoModal').classList.remove('active');" id="promoModal" class="customModalWrapper">
                                  <div class="customModalOverflow">
                                     <div class="customModalPosition">
                                        <div role="presentation" onmousedown="event.stopPropagation();" class="customModalContent">
                                           <div class="boxHeader">
                                              <div class="text">
                                                  <p class="title">Промокоды</p>
                                                  <img src="https://gspics.org/images/2024/02/17/0bng7u.png" alt="Промокоды">
                                              </div>
                                              <button onclick="document.querySelector('#promoModal').classList.remove('active');" type="button" class="btn Button-module__btn Button-module__gray">
                                                  <img src="https://gspics.org/images/2024/02/17/0bnMuo.png" alt="Закрыть">
                                              </button>
                                           </div>
                                           <div class="boxBody">
                                              <div class="body__content">
                                                  <p>Все промокоды активируются в <span><a href="/profile">личном профиле</span></a>.<br> Всего их существует два вида:<br>
                                                  <br>
                                                  <span>На баланс</span> - это промокоды, после введения которого ваш донат счёт увеличивается на n-ое количество.<br>
                                                  <br>
                                                  <span>На скидку</span> - это промокоды, после введения которых у вас появляется персональная скидка на все товары.<br>
                                                  <br>
                                                  Промокоды можно найти в группе <span><a href="https://discord.gg/t9nTJ6Ve" target="_blank">Discord</a></span>.</p>
                                              </div>
                                           </div>
                                        </div>
                                     </div>
                                  </div>
                               </div>`
                
                document.querySelector('main').insertAdjacentHTML('beforeend', htmlCode);
            }
          
            function addModalBonus() {
            	const htmlCode = `<div role="presentation" onmousedown="document.querySelector('#bonusModal').classList.remove('active');" id="bonusModal" class="customModalWrapper">
                                  <div class="customModalOverflow">
                                     <div class="customModalPosition">
                                        <div role="presentation" onmousedown="event.stopPropagation();" class="customModalContent">
                                           <div class="boxHeader">
                                              <div class="text">
                                                  <p class="title">Бонусы при пополнении</p>
                                                  <img src="https://gspics.org/images/2024/02/18/0bny7X.png" alt="Бонусы">
                                              </div>
                                              <button onclick="document.querySelector('#bonusModal').classList.remove('active');" type="button" class="btn Button-module__btn Button-module__gray">
                                                  <img src="https://gspics.org/images/2024/02/17/0bnMuo.png" alt="Закрыть">
                                              </button>
                                           </div>
                                         <div class="boxBody boxCustom">
                                              <div class="body__price">
                                                  <div class="action">
                                                      <div class="price">100 ₽</div>
                                                      <img src="https://gspics.org/images/2024/02/18/0bnffI.png" alt="Равно">
                                                      <div class="discount">10 %</div>
                                                  </div>
                                                  <div class="action">
                                                      <div class="price">200 ₽</div>
                                                      <img src="https://gspics.org/images/2024/02/18/0bnffI.png" alt="Равно">
                                                      <div class="discount">15 %</div>
                                                  </div>
                                                  <div class="action">
                                                      <div class="price">300 ₽</div>
                                                      <img src="https://gspics.org/images/2024/02/18/0bnffI.png" alt="Равно">
                                                      <div class="discount">20 %</div>
                                                  </div>
                                              </div>
                                              <div class="body__price">
                                                  <div class="action">
                                                      <div class="price">500 ₽</div>
                                                      <img src="https://gspics.org/images/2024/02/18/0bnffI.png" alt="Равно">
                                                      <div class="discount">25 %</div>
                                                  </div>
                                                  <div class="action">
                                                      <div class="price">1000 ₽</div>
                                                      <img src="https://gspics.org/images/2024/02/18/0bnffI.png" alt="Равно">
                                                      <div class="discount">30 %</div>
                                                  </div>
                                                  <div class="action">
                                                      <div class="price">2000 ₽</div>
                                                      <img src="https://gspics.org/images/2024/02/18/0bnffI.png" alt="Равно">
                                                      <div class="discount">35 %</div>
                                                  </div>
                                              </div>
                                           </div>
                                               <div class="boxFooter">
                                              <p>Бонус начисляется только при пополнении донат баланса на указанную сумму, если вы пополните баланс к примеру на 110 рублей, бонус не сработает.</p>
                                           </div>
                                        </div>
                                     </div>
                                  </div>
                               </div>`
                
                document.querySelector('main').insertAdjacentHTML('beforeend', htmlCode);
            }
          
        	addNewsBlock(); editElement(); addElement(); addModalPromo(); addModalBonus(); // Function
        })

        window.componentsManager.load()
    }

    function bonus() {
        window.dispatchEvent(new CustomEvent("initState"));
        window.dispatchEvent(new CustomEvent("initComponentsManager"));

        window.componentsManager.addListener('BALANCE_MODAL', 'DID_MOUNT', () => {
            function addElement() {
                const htmlCode = `
                    <div class="bonus-container">
                        <div class="bonus-header">
                            <img src="https://i.imgur.com/47zDTdE.png" alt="Что-то" class="bonus-icon">
                            <span>Бонус к депозиту</span>
                        </div>
                        <div class="bonus-options">
                            <span class="hh" style="border-right: solid 2px #babbbd; padding-right: 10px;">+10%</span>
                            <span class="hh" style="border-right: solid 2px #babbbd; padding-right: 10px;">+15%</span>
                            <span class="hh" style="border-right: solid 2px #babbbd; padding-right: 10px;">+20%</span>
                            <span class="hh" style="border-right: solid 2px #babbbd; padding-right: 10px;">+25%</span>
                            <span class="hh" style="border-right: solid 2px #babbbd; padding-right: 10px;">+30%</span>
                            <span class="hh">35%</span>
                        </div>
                        <div class="bonus-amounts">
                            <span data-amount="100">100₽</span>
                            <span data-amount="200">200₽</span>
                            <span data-amount="300">300₽</span>
                            <span data-amount="500">500₽</span>
                            <span data-amount="1000">1000₽</span>
                            <span data-amount="2000">2000₽</span>
                        </div>
                    </div>
                    <div class="bonus-summary">
                        <span>К зачислению:</span>
                        <div class="bonus-summary-amounts">
                            <span>0₽</span>
                            <span class="bonus-extra">+0₽</span>
                        </div>
                    </div>
                `;

                const balanceForm = document.querySelector('.PlayerBalanceModal-module__form');
                if (balanceForm) {
                    balanceForm.insertAdjacentHTML('afterend', htmlCode);

                    const inputField = document.querySelector('.PlayerBalanceModal-module__input');
                    const bonusAmounts = document.querySelectorAll('.bonus-amounts span');
                    const bonusOptions = document.querySelectorAll('.bonus-options span');
                    const bonusSummaryAmount = document.querySelector('.bonus-summary-amounts span');
                    const bonusExtra = document.querySelector('.bonus-extra');
    
                    const amountToPercentageMap = {
                        100: 0,
                        200: 1,
                        300: 2,
                        500: 3,
                        1000: 4,
                        2000: 5
                    };
    
                    const percentageValues = [10, 15, 20, 25, 30, 35];
    
                    bonusOptions.forEach((span, index) => {
                        span.addEventListener('click', () => {
                            const amount = Object.keys(amountToPercentageMap)[index];
                            inputField.value = amount;
                            inputField.dispatchEvent(new Event('input'));
                        });
                    });
    
                    inputField.addEventListener('input', () => {
                        const inputValue = parseInt(inputField.value, 10);
    
                        bonusAmounts.forEach(span => {
                            const amount = parseInt(span.getAttribute('data-amount'), 10);
                            if (inputValue >= amount) {
                                span.classList.add('activee');
                            } else {
                                span.classList.remove('activee');
                            }
                        });
    
                        let maxActiveAmount = 0;
                        bonusAmounts.forEach(span => {
                            const amount = parseInt(span.getAttribute('data-amount'), 10);
                            if (inputValue >= amount) {
                                maxActiveAmount = amount;
                            }
                        });
    
                        bonusOptions.forEach((span, index) => {
                            if (index <= amountToPercentageMap[maxActiveAmount]) {
                                span.classList.add('active');
                            } else {
                                span.classList.remove('active');
                            }
                        });
    
                        bonusSummaryAmount.textContent = `${inputValue}₽`;
                        const percentageIndex = amountToPercentageMap[maxActiveAmount];
                        const bonusValue = percentageIndex !== undefined ? (inputValue * percentageValues[percentageIndex]) / 100 : 0;
                        bonusExtra.textContent = `+${bonusValue}₽`;
                    });
    
                    // Находим и заменяем кнопку на ссылку
                    const submitButton = document.querySelector('.Button-module__btn.Button-module__accent');
                    if (submitButton) {
                        const link = document.createElement('a');
                        link.className = submitButton.className;
                        link.textContent = submitButton.textContent;
                        
                        // Обновляем href при вводе суммы
                        inputField.addEventListener('input', () => {
                            const amount = inputField.value;
                            link.href = `/api/v1/player.donate?amount=${amount}`;
                        });
                        
                        submitButton.parentNode.replaceChild(link, submitButton);
                    }
                }
            }
            addElement();
        })


        window.componentsManager.load()
    }
  
  	function shopProfilePage() {
        window.dispatchEvent(new CustomEvent("initState"));

        window.dispatchEvent(new CustomEvent("initComponentsManager"));

        window.componentsManager.addListener('PROFILE_PAGE', 'DID_MOUNT', () => {

          	function addModalPromo() {
            	const htmlCode = `<div role="presentation" onmousedown="document.querySelector('#promoModal').classList.remove('active');" id="promoModal" class="customModalWrapper">
                                  <div class="customModalOverflow">
                                     <div class="customModalPosition">
                                        <div role="presentation" onmousedown="event.stopPropagation();" class="customModalContent">
                                           <div class="boxHeader">
                                              <div class="text">
                                                  <p class="title">Промокоды</p>
                                                  <img src="https://gspics.org/images/2024/02/17/0bng7u.png" alt="Промокоды">
                                              </div>
                                              <button onclick="document.querySelector('#promoModal').classList.remove('active');" type="button" class="btn Button-module__btn Button-module__gray">
                                                  <img src="https://gspics.org/images/2024/02/17/0bnMuo.png" alt="Закрыть">
                                              </button>
                                           </div>
                                           <div class="boxBody">
                                              <div class="body__content">
                                                  <p>Все промокоды активируются в <span><a href="/profile">личном профиле</span></a>.<br> Всего их существует два вида:<br>
                                                  <br>
                                                  <span>На баланс</span> - это промокоды, после введения которого ваш донат счёт увеличивается на n-ое количество.<br>
                                                  <br>
                                                  <span>На скидку</span> - это промокоды, после введения которых у вас появляется персональная скидка на все товары.<br>
                                                  <br>
                                                  Промокоды можно найти в группе <span><a href="https://discord.gg/t9nTJ6Ve" target="_blank">Discord</a></span>.</p>
                                              </div>
                                           </div>
                                        </div>
                                     </div>
                                  </div>
                               </div>`
                
                document.querySelector('main').insertAdjacentHTML('beforeend', htmlCode);
            }
          
            function addModalBonus() {
            	const htmlCode = `<div role="presentation" onmousedown="document.querySelector('#bonusModal').classList.remove('active');" id="bonusModal" class="customModalWrapper">
                                  <div class="customModalOverflow">
                                     <div class="customModalPosition">
                                        <div role="presentation" onmousedown="event.stopPropagation();" class="customModalContent">
                                           <div class="boxHeader">
                                              <div class="text">
                                                  <p class="title">Бонусы при пополнении</p>
                                                  <img src="https://gspics.org/images/2024/02/18/0bny7X.png" alt="Бонусы">
                                              </div>
                                              <button onclick="document.querySelector('#bonusModal').classList.remove('active');" type="button" class="btn Button-module__btn Button-module__gray">
                                                  <img src="https://gspics.org/images/2024/02/17/0bnMuo.png" alt="Закрыть">
                                              </button>
                                           </div>
                                           <div class="boxBody boxCustom">
                                              <div class="body__price">
                                                  <div class="action">
                                                      <div class="price">100 ₽</div>
                                                      <img src="https://gspics.org/images/2024/02/18/0bnffI.png" alt="Равно">
                                                      <div class="discount">10 %</div>
                                                  </div>
                                                  <div class="action">
                                                      <div class="price">200 ₽</div>
                                                      <img src="https://gspics.org/images/2024/02/18/0bnffI.png" alt="Равно">
                                                      <div class="discount">15 %</div>
                                                  </div>
                                                  <div class="action">
                                                      <div class="price">300 ₽</div>
                                                      <img src="https://gspics.org/images/2024/02/18/0bnffI.png" alt="Равно">
                                                      <div class="discount">20 %</div>
                                                  </div>
                                              </div>
                                              <div class="body__price">
                                                  <div class="action">
                                                      <div class="price">500 ₽</div>
                                                      <img src="https://gspics.org/images/2024/02/18/0bnffI.png" alt="Равно">
                                                      <div class="discount">25 %</div>
                                                  </div>
                                                  <div class="action">
                                                      <div class="price">1000 ₽</div>
                                                      <img src="https://gspics.org/images/2024/02/18/0bnffI.png" alt="Равно">
                                                      <div class="discount">30 %</div>
                                                  </div>
                                                  <div class="action">
                                                      <div class="price">2000 ₽</div>
                                                      <img src="https://gspics.org/images/2024/02/18/0bnffI.png" alt="Равно">
                                                      <div class="discount">35 %</div>
                                                  </div>
                                              </div>
                                           </div>
                                               <div class="boxFooter">
                                              <p>Бонус начисляется только при пополнении донат баланса на указанную сумму, если вы пополните баланс к примеру на 110 рублей, бонус не сработает.</p>
                                           </div>
                                        </div>
                                     </div>
                                  </div>
                               </div>`
                
                document.querySelector('main').insertAdjacentHTML('beforeend', htmlCode);
            }
          
          	function addElement() {
                const container = document.querySelector('.ProfileNav-module__body.boxBody');
                const buttons = container.querySelectorAll('a');

                buttons.forEach((button) => {
                    const image = document.createElement('img');
                    const buttonText = button.innerText;

                    let imagePath = '';
                    switch (buttonText) {
                        case 'Профиль':
                          imagePath = 'https://gspics.org/images/2024/02/18/0b6Mux.png';
                          break;
                        case 'Корзина':
                          imagePath = 'https://gspics.org/images/2024/02/18/0b6g7Q.png';
                          break;
                        case 'История':
                          imagePath = 'https://gspics.org/images/2024/02/18/0b6X6a.png';
                          break;
                        default:
                          imagePath = null;
                    }

                    image.src = imagePath;
                    image.alt = buttonText;

                    button.insertBefore(image, button.firstChild);
                });
            }
          
          	function editElement() {
                const logoutButton = document.querySelector('.ProfileNav-module__logOut');
                if (logoutButton) {
                    logoutButton.textContent = 'Выйти из аккаунта';
                    logoutButton.addEventListener('click', function() {
                      	location.reload();
                    });
                }
            }
          
          	addModalPromo(); addModalBonus(); addElement(); editElement(); // Function
        })

        window.componentsManager.load()
    }
  
  	// Open modal window
    function openModal(nameModal) {
        var modal = document.getElementById(nameModal);
        if (modal.classList.contains('active')) {
              modal.classList.remove('active');
        } else {
              modal.classList.add('active');
        }
    }
   
const updateFooter = () => {
    setTimeout(() => {
        const boxFooter = document.querySelector('.boxFooter');
        const footerOriginText = document.querySelector('.ShopFooter-module__text')
        const emailLink = document.querySelector('a[href="mailto:help@gamestores.ru"]')
        if(!emailLink || !boxFooter || footerOriginText) return false

        emailLink.textContent = ''
        footerOriginText.innerHTML = `
            <span class="contact">ФИО: </span>
            <span class="contact">Инн: </span>
            <span class="contact">Огрнип: </span>
            <span class="contact">Адрес: </span>
        `
    }, 0)
}

const re = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/

const updateTopUpModal = () => {
    setTimeout(() => {

        const btn = document.querySelector('.PlayerBalanceModal-module__footer .Button-module__accent');
        const form = document.querySelector('.PlayerBalance-module__modal .PlayerBalanceModal-module__form');

        if(!btn || !form) return false

        const emailLabel = document.createElement("label")
        emailLabel.setAttribute('for', 'email');
        emailLabel.setAttribute('class', 'PlayerBalanceModal-module__label customEmailLabel');
        emailLabel.textContent = 'Email'

        const emailInputWrapper = document.createElement("label")
        emailInputWrapper.setAttribute('class', 'PlayerBalanceModal-module__inputWrapper');
        emailInputWrapper.innerHTML = `
            <input autocomplete="email" id="email" name="email" class="PlayerBalanceModal-module__input customEmailInput" placeholder="Email" value="">
        `

        form.insertAdjacentElement('beforeend', emailLabel)
        form.insertAdjacentElement('beforeend', emailInputWrapper)

        btn.addEventListener('click', async (e) => {
            e.preventDefault()
            e.stopPropagation()

            const valueInput = document.querySelector('.PlayerBalanceModal-module__input');
            if (!valueInput) return false
            const emailInput = document.querySelector('.customEmailInput');
            if (!emailInput) return false

            if(isNaN(valueInput.value) || +valueInput.value < 49) {
                window.addToast(true, 'Сумма должна быть больше 50 RUB!')
                return
            }

            if(!re.test(emailInput.value)) {
                window.addToast(true, 'Email указан не верно!')
                return
            }

            const raw = JSON.stringify({
                sum: +valueInput.value,
                email: emailInput.value,
                steamId: window.getState().player.player.steamId
            });

            const requestOptions = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                },
                body: raw,
                redirect: "follow"
            };

            const response = await fetch("https://payments.bummerrust.ru/create-payment-link", requestOptions)

            if(!response.ok || response.status !== 201) {
                window.addToast(true, 'Не удалось отправить запрос на создание платежа!')
                return
            }

            const json = await response.json()

            window.location.href = json.success.payload
        })
    }, 0)
}

function paymentsMain() {
    window.dispatchEvent(new CustomEvent("initState"));
    window.dispatchEvent(new CustomEvent("initComponentsManager"));
    window.dispatchEvent(new CustomEvent("initToastManager"));

    window.componentsManager.addListener('SHOP_PAGE', 'DID_UPDATE', updateFooter)
    window.componentsManager.addListener('BALANCE_MODAL', 'DID_UPDATE', updateTopUpModal)

    window.componentsManager.load()
}
  
  	// Open an image from the product description
    function changeImageSize(index) {
        var images = document.querySelectorAll('.desc__content > a > img');

        if (index >= 0 && index < images.length) {
            var img = images[index];

            if (img.style.width === '385px') {
                img.style.width = '';
                img.style.transition = '';
                img.style.borderRadius = '';
                img.style.zIndex = '';
                img.style.position = '';
                img.style.top = '';
                img.style.left = '';
                img.style.transform = '';
            } else {
                img.style.width = '385px';
                img.style.transition = 'width 0.5s, border-radius 0.5s, z-index 0.5s, position 0.5s, top 0.5s, left 0.5s, transform 0.5s';
                img.style.borderRadius = '8px';
                img.style.zIndex = '999';
                img.style.position = 'absolute';
                img.style.top = '50%';
                img.style.left = '50%';
                img.style.transform = 'translate(-50%, -50%)';
            }
        }
    }
    // Load component's
    if (window.isAppReady) {
      if (typeof shopHeader === 'function') {
        shopHeader();
      }
      shopMainPage();
      shopProfilePage();
      addFooterLink();
      bonus()
paymentsMain();
    } else {
      window.addEventListener('appReady', () => {
        if (typeof shopHeader === 'function') {
          shopHeader();
        }
        shopMainPage();
        shopProfilePage();
		addFooterLink();
        bonus()
paymentsMain();
      });
    }
  
} else {
      alert("ERROR: You do not have access to the code of this store!");
      location.reload();
}
