{{- define "app.values.env.plaint" -}}
- name: LOG_LEVEL
  value: {{ .Values.app.log.level | quote }}
- name: FEATURES
  value: {{ .Values.app.features | quote }}
{{- end }}

{{- define "app.values.env.secret" -}}
{{- end }}

{{- define "app.values.secret" -}}
{{- end }}

{{- define "app.values.configMap" -}}
{{- end }}

{{- define "app.values.volumeMounts" -}}
{{- end }}

{{- define "app.values.volumes" -}}
{{- end }}

{{- define "app.values.initContainers" -}}
{{- end }}

{{- define "app.values.containers" -}}
{{- end }}

{{- define "app.values.affinity" -}}
{{- end }}

{{- define "app.values.annotation" -}}
{{- end }}

{{- define "app.values.ingress.annotation" -}}
{{- end }}
