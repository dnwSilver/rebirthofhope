# Kubernetes practice

## 🚀 Начало

Пользователь вызывает endpoint и начинает свой путь:

```bash
http POST rebirthofhope.ru/join
```

## 📋 Plan

### 🛠️ Подготовка и проведение

1. Доклад (Что есть, зачем оно нам?)
1. 12 factors
б1. Приложения
1. Инструмент для нагрузки
1. Инструмент для валидации каждого этапа
1. Опрос после выполнения практики (для подведения итогов)
1. Болванка для деплоев

### 🧠 Компетенции

1. Секреты
1. Пробы
1. Логи
1. Метрики
1. Маршрутизация
1. Балансировка??
1. Масштабирование
1. Переменные окружения
1. Волюмы

### ⚔️ Задания

На каждый этап выделяется по десять минут.
Семь минут на самостоятельное решение и три минуты на решение с подсказкой.

Итого получается семьдесят минут.

Можно сдаться и сразу запросить все подсказки.

#### 🤿 Погружение

1. `curl` Получение реквизитов для доступов по SSH.
1. `bash` Вход на сервер.
1. `curl` 🎯 Вычитка легенды.
1. `git` Клонирование репозитория с конфигами.

#### 🥸 Исследование

1. `bash` Запуск k9s.
1. `k9s` Поиск namespace.
1. `k9s` Вход в namespace.
1. `k9s` Вход на перечень ingress'ов
1. `k9s` Получение адресов для api/uix.
1. `curl` /metrics
1. `curl` /healthz
1. `curl` /readyz

#### 🌾 Отделить зёрна от плевел

1. `vim` Изменение уровня логирования на info.
1. `git` Уменьшение уровня логирования. В deploy видим уровень логирования trace.
1. `git` Фиксация изменений.
1. `helmfile` Обновляем инфраструктуру.
1. `k9s` 💰 Вход в POD API. Логи с неправильными секретом к БД.
1. `k9s` 🔗 В логах у uix можно заметить что не хватает переменной окружения на api. healthz false

#### 🗝️ Секретные материалы

1. `helm` Открытие секретов.
1. `vim` Изменение секрета.
1. `vim` Сохранение файла.
1. `git` Фиксация изменений.
1. `helmfile` Обновляем инфраструктуру.
1. `curl` Проверка пробы neighbors.
1. `gitlab` Слияние ветки в мастер.

#### 💰 Нужно больше золота

1. `k9s` Вход в deploy api
1. `k9s` Скейлим до 2 подов
1. `web` Проверяем работу сайта
1. `git` Фиксируем данные через MR

#### 🔗 Воссоединение

1. `git` Создание новой ветки для фикса
1. `vim` Добавление переменной окружения
1. `git` Фиксация изменений
1. `gitlab` Выкат с ветки
1. `k9s` Проверка логов
1. `k9s` Проверка пробы healthz
1. `gitlab` Слияние ветки в мастер

#### 🧹 Чистый четверг

1. `git` Создание новой ветки
1. `vim` Добавление _extra ingress_'а
1. `gitlab` Выкат новой конфигурации
1. `web` Проверка на отсутствие `preflight` запросов
1. `gitlab` Выкат новой конфигурации
1. `web` Проверка на отсутствие `preflight` запросов

#### 🖼️ Реставрация

1. `git` Создание новой ветки
1. `vim` Добавление PVC Volume
1. `git` Фиксация
1. `gitlab` Публикация
1. `web` Проверка
1. `gitlab` Слияние


Доделки:
- Разбить туториалы на слаги дальше
- Проверка на латиницу в call
