# Adeudo Vehicular Jalisco

Extensión de Google Chrome para la [página](https://gobiernoenlinea1.jalisco.gob.mx/serviciosVehiculares/adeudos) de adeudos vehiculares del estado de Jalisco. Los datos del vehículo son ingresados una única vez, y se guardan en una lista desplegable para facilitar el llenado del formulario.

![Vista previa de la extensión](/repo-assets/preview.png)

### Instrucciones

1. Clonar el repositorio
2. Ejecutar <code>npm install</code> en el directorio raíz
3. Generar la carpeta <code>/dist</code> con el comando <code>npm run build</code>

### Uso de la Extensión

> Al ser una extensión aún no publicada en la ChromeWebStore se tiene que cargar manualmente la carpeta <code>/dist</code> como una extensión sin empaquetar, ver instrucciones [aquí](https://developer.chrome.com/docs/extensions/get-started/tutorial/hello-world?hl=es-419#load-unpacked)

1. Hacer click en el icono de la extensión
2. Llenar el formulario con los datos del vehículo en la ventana emergente
3. Dar click en guardar
4. Verificar en la pagina de adeudos que el vehiculo aparezca en la lista desplegable, de ser necesario recargue la página

### Aviso

- Extensión no oficial, sin relación con el Gobierno de Jalisco
- Todos los datos son guardados utilizando [Storage Sync API](https://developer.chrome.com/docs/extensions/reference/api/storage?hl=es-419#storage_areas) (los datos se sincronizan con cualquier navegador Chrome al que el usuario haya accedido)
- Al desinstalar la extensión, todos los datos son eliminados
