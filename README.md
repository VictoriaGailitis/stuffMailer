# StuffMailer
StuffMailer - это веб-сервис для удобного получения данных из различных API посредством письма на электронную почту. Является курсовой работой по дисциплине "Backend-разработка" за 3-ий курс обучения.
## Установка и настройка
1. `npm i`
2. `npm start`
## Пример корректного добавления новой рассылки
Название рассылки: `Случайная картинка собаки`

Описание рассылки: `Получите на свою почту случайную картинку собаки`

API: `https://dog.ceo/api/breeds/image/random`

Шаблон HTML:

\<h1>Привет!\</h1>

\<b> Вот твоя случайная картинки собаки: \<b>

\<img src="DATA0">\</img>

\<p>Статус запроса: DATA1\</p>

\<hr>

\<b>Отправлено с помощью StuffMailer\</b>

__Важно!__  DATA0 и DATA1 - ключевые слова-заглушки для подстановки значений ключей возвращаемого json-объекта API. Данный API возвращает json-объект с двумя ключами, следовательно в шаблоне HTML должно быть 2 ключевых слова типа DATA[индекс с нуля]

## Структура проекта
1. `index.js кореневой папки` - код серверной части веб-сервиса
2. `index.js папки public` - код клиентской части в веб-сервиса
3. `index.html` - разметка страницы веб-сервиса
4. `favicon.ico` - фавикон веб-сервиса
5. `images` - изображения, используемые в оформлении веб-сервиса

## Зависимости и требования

1. `"express": "^4.18.2"`
2. `"hbs": "^4.2.0"`
3. `"mongoose": "^7.0.2"`
4. `"nodemailer": "^6.9.13"`
5. `"nodemon": "^2.0.20"`
