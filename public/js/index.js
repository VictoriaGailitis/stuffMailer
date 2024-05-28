// Контейнер для вывода рассылок
let container = document.querySelector(`.mailings`);
let containerAlerts = document.querySelector(`.alerts`);

// Массив для хранения рассылок
let MAILINGS = [];

// Загрузка данных при запуске скрипта
loadMailings();
activateFormMailings();

axios.defaults.headers.post['Content-Type'] = 'application/json'

async function loadMailings() {
    // 1. Загрузи данные с сервера
    let response = await axios.get('/mailings/all')
    // 2. Сохрани их в массив MAILINGS
    MAILINGS = response.data
    // 3. Выведи массив на экран
    renderMailings();
}

function renderMailings() {
    // 1. Очисти контейнер
    container.innerHTML = ``;

    // 2. Нарисуй каждую рассылку
    if (MAILINGS.length == 0) {
        container.innerHTML += `<div class="d-flex justify-content-center" style="color:grey;">
        <h4>Пока еще нет доступных рассылок!</h4>
        </div>`
    }
    else {
        for (let i = 0; i < MAILINGS.length; i++) {
            // 3. Получи рассылку
            let mailing = MAILINGS[i];
    
            // 4. Выведи информацию о рассылке
            container.innerHTML += 
            `<div class="d-flex gap-2 w-100 mb-3 justify-content-between border rounded">
                <div>
                    <h6 class="mb-2 ms-2 me-2 mt-2">${mailing.name}</h6>
                    <p class="mb-2 ms-2 me-2 mt-2 opacity-75">${mailing.description}</p>
                    <button class="btn btn-primary mb-2 ms-2 me-2 mt-2" id="sub-button" type="button">
                        Подписаться
                    </button>
                    <button class="btn btn-danger mb-2 ms-2 me-2 mt-2" id="del-button" type="button">
                        Удалить
                    </button>
                </div>
            </div>`;
        }
    }
    
    // 5. Повесь обработчики событий
    activateClicksSubscribe();
    activateClicksRemove();
}

function activateFormMailings() {
    let form = document.querySelector(`#post-mailing`)
    form.addEventListener(`submit`, async function(evt) {
        evt.preventDefault()
        let response = await axios.post('/mailings/create', form)
        let mailing = response.data
        MAILINGS.push(mailing)
        renderMailings()
        form.reset()
    })
}

function activateClicksSubscribe() {
    let buttons = document.querySelectorAll(`#sub-button`)
    for (let i = 0; i < buttons.length; i++) {
        let button = buttons[i]
        let mailing = MAILINGS[i]
        button.addEventListener('click', async function() {
            let response = axios.post('/mailings/send', {
                id: mailing._id
            })
            containerAlerts.innerHTML = ``
            containerAlerts.innerHTML += `
            <div class="alert alert-success" role="alert">
            Успешно отправлено!
            </div>`
        })
    }
}

function activateClicksRemove() {
    let removeButtons = document.querySelectorAll(`#del-button`)
    for (let i = 0; i < removeButtons.length; i++) {
        let button = removeButtons[i];
        let mailing = MAILINGS[i]

        button.addEventListener('click', async function() {
            let response = axios.post('/mailings/remove', {
                id: mailing._id
            })
            MAILINGS.splice(i, 1)
            renderMailings()
        })
    }
}