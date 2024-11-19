#!/bin/bash

APPROACH=$(curl --silent https://rebirthofhope.ru/api/approach || 0)

[[ -z $CALL ]] && \
echo "Кто ты? Почему у тебя нет позывного? Он должен быть на сайте, cверху." && \
exit 1

echo "Дорогой технарь ${CALL}:"
echo ""
echo "  Когда ты   закончишь «настраивать»   эту   инфраструктуру и поймешь, насколько"
echo "  большой  ошибкой   было     делать    это,      пожалуйста,  увеличь   счетчик"
echo "  внизу как предупреждение для следующего парня (или девушки):"
echo ""
echo "  total_hours_wasted_here = ${APPROACH}"
echo ""
echo "  Инструменты для выполнения миссий:"
echo "    · git"
echo "    · k9s"
echo "    · vim"
echo "    · helm"
echo ""
echo "  PS: Прогресс фиксируется, но всё абсолютно анонимно 🥸"

eval $(ssh-agent -s) >/dev/null;
cat ~/.ssh/id_rsa | tr -d '\r' | ssh-add - &>/dev/null;
git config --local core.hooksPath /root/.githooks/ &>/dev/null;