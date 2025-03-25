## Una terminal interactiva que documenta un perfil profesional. 

### Basándome en la publicación de <a href="https://www.freecodecamp.org/news/how-to-create-an-interactive-terminal-portfolio-website/" target="_blank" rel="noopener noreferrer">freeCodeCamp</a>, implemento conceptos de JavaScript que me permiten construir y renderizar la aplicación, utilizando diversas librerías para lograr una estética atractiva.

![image](https://github.com/user-attachments/assets/cb424843-cb4e-4697-9e85-6935b9e0e3a0)

![image](https://github.com/user-attachments/assets/efb7c828-acd3-4eb4-817f-a218cb160067)

![image](https://github.com/user-attachments/assets/35355a01-2849-4b21-abda-82d290d8ad57)

## Error: Problema de CORS al cargar la fuente desde un servidor externo
Al intentar cargar la fuente `Graffiti.flf` desde una URL externa, el navegador bloquea la solicitud debido a restricciones de CORS (Cross-Origin Resource Sharing). Esto impide que la fuente se cargue correctamente en la aplicación.

## Solución: Uso de la fuente localmente
Para evitar este problema, la fuente `Graffiti.flf` se ha descargado y almacenado en una carpeta local dentro del proyecto (por ejemplo, en fonts/). Luego, se ha actualizado la configuración de Figlet para cargar la fuente desde el repositorio local en lugar de una URL externa:

``` javascript
figlet.defaults({ fontPath: 'fonts/' });
figlet.preloadFonts([font], initTerminal);
```
#### Fuentes para descargar en formato .flf:
- https://app.unpkg.com/figlet@1.8.0/files/fonts
- https://unpkg.com/figlet@1.8.0/fonts/Graffiti.flf
#### Actualización de librerías:
- https://www.jsdelivr.com/package/npm/figlet
