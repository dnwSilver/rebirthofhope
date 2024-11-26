{{- define "app.name" -}}
{{- $name := regexReplaceAll (print "([a-z0-9]+)-([a-z0-9]+)-(.*)") .Release.Name "${3}" -}}
{{- default $name .Values.nameOverride }}
{{- end }}

{{- define "app.instance" -}}
{{- $instance := regexReplaceAll (print "([a-z0-9]+)-([a-z0-9]+)-.*") .Release.Name "${1}-${2}" }}
{{- default $instance .Values.instanceOverride }}
{{- end }}

{{- define "app.partOf" -}}
{{- default (include "app.name" . ) .Values.partOfOverride }}
{{- end }}

{{- define "app.fullname" -}}
{{- $prefix := default (include "app.instance" .) .Values.fullnamePrefixOverride }}
{{- printf "%s-%s" $prefix (include "app.name" .) | trunc 63 | trimSuffix "-" }}
{{- end }}

{{- define "app.version" -}}
{{- default .Chart.AppVersion .Values.image.tag }}
{{- end }}

{{- define "app.image" -}}
{{- printf "%s:%v" .Values.image.repository (include "app.version" .) }}
{{- end }}

{{- define "app.imagePullPolicy" }}
{{- if hasSuffix "-branch" (include "app.version" .) }}
{{- print "Always" }}
{{- else }}
{{- .Values.image.pullPolicy }}
{{- end }}
{{- end }}

{{- define "common.labels" -}}
{{ include "common.selectorLabels" . }}
{{- end }}

{{- define "common.selectorLabels" -}}
app.kubernetes.io/instance: {{ include "app.instance" . }}
app.kubernetes.io/part-of: {{ include "app.partOf" . }}
{{- end }}

{{- define "app.labels" -}}
app.kubernetes.io/name: {{ include "app.name" . }}
app.kubernetes.io/version: {{ include "app.version" . | trunc 63 | trimSuffix "-" | quote }}
{{ include "common.labels" . }}
{{- end }}

{{- define "app.selectorLabels" -}}
app.kubernetes.io/name: {{ include "app.name" . }}
{{ include "common.selectorLabels" . }}
{{- end }}

{{- define "app.annotations" -}}
{{- range $k, $v := .Values.annotations }}
{{ $k }}: {{ $v | quote }}
{{- end }}
{{ include "app.values.annotation" . }}
{{- end }}

{{- define "app.podAnnotations" -}}
values-hash: {{ .Values.app | toYaml | sha256sum }}
configmap-hash: {{ include "app.configMap" . | toYaml | sha256sum }}
secret-hash: {{ include "app.secret" . | toYaml | sha256sum }}
{{- if hasSuffix "-branch" (include "app.version" .) }}
force-redeploy: {{ now | date "2006-01-02 15:04:05" | quote }}
{{- end }}
{{- end }}

{{- define "app.env" -}}
{{ include "app.values.env.plaint" . }}
{{- range $k := ((print "list:\n" (include "app.values.env.secret" .)) | fromYaml).list }}
- name: {{ $k.name }}
{{- if or (eq ($k.value | toString) "<nil>") (eq ($k.value | toString) "") }}
  value: ""
{{- else }}
  valueFrom:
    secretKeyRef:
      name: {{ include "app.fullname" $ }}
      key: ENV_{{ $k.name }}
{{- end }}
{{- end }}
{{- end }}

{{- define "app.secret" -}}
{{- range $k := ((print "list:\n" (include "app.values.env.secret" .)) | fromYaml).list }}
{{- if and (ne ($k.value | toString) "<nil>") (ne ($k.value | toString) "") }}
ENV_{{ $k.name }}: {{ $k.value | b64enc | nindent 2 }}
{{- end }}
{{- end }}
{{ include "app.values.secret" . }}
{{- end }}

{{- define "app.configMap" -}}
{{- with .Values.configMap }}
{{- toYaml . }}
{{- end }}
{{ include "app.values.configMap" . }}
{{- end }}

{{- define "app.volumeMounts" -}}
{{- with .Values.volumeMounts }}
{{- toYaml . }}
{{- end }}
{{ include "app.values.volumeMounts" . }}
{{- end }}

{{- define "app.volumes" -}}
{{- with .Values.volumes }}
{{- toYaml . }}
{{- end }}
{{ include "app.values.volumes" . }}
{{- end }}

{{- define "app.initContainers" -}}
{{ include "app.values.initContainers" . }}
{{- end }}

{{- define "app.containers" -}}
{{ include "app.values.containers" . }}
{{- end }}

{{- define "app.affinity" -}}
{{- if .Values.affinity }}
{{- with .Values.affinity }}
{{- toYaml . }}
{{- end }}
{{- else }}
{{ include "app.values.affinity" . }}
{{- end }}
{{- end }}

{{- define "app.ingress.annotations" -}}
{{ .Values.ingress.annotations | toYaml }}
{{ include "app.values.ingress.annotation" . }}
{{- end }}
