#!/bin/bash

APPROACH=$(curl --silent http://rebirthofhope.ru/api/approach || 0)

[[ -z $call ]] && \
echo "Кто ты? Почему у тебя нет позывного? Он должен быть на сайте, cверху." && \
exit 1

echo "Дорогой технарь ${call}:"
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
