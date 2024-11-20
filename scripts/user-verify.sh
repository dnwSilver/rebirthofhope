#!/bin/bash
. "$(dirname "$0")/framework.sh" /tmp/itperspectives/practice/k8s

# CONSTANTS
CURATOR_DOMAIN=https://rebirthofhope.ru

# PARAMETERS
CALL=$1

CALL_ICON=$(mark )

# VALIDATIONS
[[ -z $CALL ]] && echo "$FAIL Required Parameter CALL not set." && exit 1

# Проверка доступного CALL
if http --check-status --ignore-stdin --timeout=2.5 HEAD $CURATOR_DOMAIN/api/call call==$CALL &> /dev/null; then
    echo "$GOOD $CALL_ICON Call is available."
else
    echo "$FAIL $CALL_ICON Call is not available."
fi
# Проверка ветки в GIT

# Проверка окружения в кубе

# Проверка доступности Site

# Проверка доступности API

# Нагрузка сервисов
