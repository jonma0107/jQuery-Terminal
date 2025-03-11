$(document).ready(function () {
    const font = 'Graffiti';
    let term;
    const root = '~';
    let cwd = root;

    // Cargar fuente Figlet antes de inicializar la terminal
    figlet.defaults({ fontPath: 'https://unpkg.com/figlet/fonts/' });
    figlet.preloadFonts([font], initTerminal);

    // Lista de comandos disponibles
    const formatter = new Intl.ListFormat('en', {
        style: 'long',
        type: 'conjunction',
    });
    
   
    // Estructura de directorios
    const directories = {
        education: [
            '',
            '<white>education</white>',
            '* <a href="https://certificados.planestic.udistrital.edu.co/validate/validar.php?codigo=b3a079d07684cd8d3412f89d53c966fb38692780" target="_blank" rel="noopener noreferrer">Universidad Distrital Francisco José de Caldas</a> <yellow>"Full Stack Development - Intermediate Level"</yellow> Sep 2023',
            '* <a href="https://oferta.senasofiaplus.edu.co/sofia-oferta/certificaciones.html" target="_blank" rel="noopener noreferrer">Servicio Nacional de Aprendizaje (SENA)</a> <yellow>"Software Programming Technician"</yellow> Apr 2022 - Jul 2023',
            '* <a href="https://hermesextension.unal.edu.co/ords/f?p=116:17" target="_blank" rel="noopener noreferrer">Universidad Nacional de Colombia</a> <yellow>"Diplomate, Software Programming and Web & Mobile App Development"</yellow> May 2021 - Dec 2021',
            ''
        ],
        projects: [
            '',
            '<white>Open Source projects</white>',
            [
                ['jQuery Terminal', 'https://jonma0107.github.io/jQuery-Terminal/', 'Website that looks like a real terminal.'],
                ['Django Website', 'https://jonathanmeza.vercel.app/es/', 'Django Website deploy in Vercel.'],
                ['AI Summary Generator', 'https://github.com/jonma0107/summary_generator_with_ai', 'Summary generator with AI.'],
                ['Django Template', 'https://github.com/jonma0107/Django-template-with-Postgresql', 'Docker template for Django with PostgreSQL.'],
            ].map(([name, url, description = '']) => {
                return `* <a href="${url}">${name}</a> &mdash; <white>${description}</white>`;
            }),
            ''
        ].flat(),
        skills: [
            '',
            '<white>languages</white>',
            [
                'JavaScript',
                'TypeScript',
                'Python',
                'SQL',
                'Bash'
            ].map(lang => `* <yellow>${lang}</yellow>`),
            '',
            '<white>libraries</white>',
            [
                'Django Rest Framework',
                'React.js',
                'FastAPI',
            ].map(lib => `* <green>${lib}</green>`),
            '',
            '<white>tools</white>',
            [
                'Docker',
                'Git',
                'AWS',
                'GNU/Linux'
            ].map(tool => `* <blue>${tool}</blue>`),
            ''
        ].flat()
    };

    const dirs = Object.keys(directories);

    function print_home() {
        term.echo(dirs.map(dir => `<blue class="directory">${dir}</blue>`).join('\n'));
    }

    const commands = {
        help() {
            term.echo(`<green>List of available commands: ${help}`);
        },
        echo(...args) {
            if (args.length > 0) {
                term.echo(args.join(' '));
            }
        },
        cd(dir = null) {
            if (dir === null || (dir === '..' && cwd !== root)) {
                cwd = root;
            } else if (dir.startsWith('~/') && dirs.includes(dir.substring(2))) {
                cwd = dir;
            } else if (dir.startsWith('../') && cwd !== root && dirs.includes(dir.substring(3))) {
                cwd = root + '/' + dir.substring(3);
            } else if (dirs.includes(dir)) {
                cwd = root + '/' + dir;
            } else {
                term.error('Wrong directory');
                return;
            }
            term.set_prompt(prompt()); // ACTUALIZAR EL PROMPT

        },
        ls(dir = null) {
            if (dir) {
                if (dir.match(/^~\/?$/)) {
                    print_home();
                } else if (dir.startsWith('~/')) {
                    const path = dir.substring(2);
                    if (dirs.includes(path)) {
                        term.echo(directories[path].join('\n'));
                    } else {
                        term.error('Invalid directory');
                    }
                } else if (cwd === root) {
                    if (dir in directories) {
                        term.echo(directories[dir].join('\n'));
                    } else {
                        term.error('Invalid directory');
                    }
                } else if (dir === '..') {
                    print_home();
                } else {
                    term.error('Invalid directory');
                }
            } else if (cwd === root) {
                print_home();
            } else {
                const dirName = cwd.substring(2);
                term.echo(directories[dirName].join('\n'));
            }
        }
    };

    // Prompt personalizado
    // const user = 'guest';
    // const server = 'portfolio';

    function prompt() {
        // return `<green>${user}@${server}</green>:<blue>${cwd}</blue>$ `;
        return `<blue>${cwd}</blue>$ `;
    }

    // Inicializar la terminal
    function initTerminal() {
        term = $('body').terminal(commands, {
            greetings: false,
            checkArity: false,
            exit: false,
            completion: function (string, callback) {
                // Autocompletado SOLO para nombres de directorios
                const matches = dirs.filter(dir => dir.startsWith(string));
                callback(matches);
            }
        });

        // Establecer el prompt correctamente desde el inicio
        term.set_prompt(prompt());
        
        // Pausar la terminal hasta que el arte ASCII esté listo
        term.pause();

        // Mostrar el mensaje de bienvenida
        term.echo(() => {
            const ascii = rainbow(render('Terminal Portfolio'));
            return `${ascii}\n\n<white>Welcome to my Terminal Portfolio</white>\n\n<white>Type <green>help</green> to know the available commands.</white>\n`;
        }, { ansi: true }).resume();


    }
    
    // Renderiza el texto ASCII con Figlet y lo adapta al tamaño del terminal    
    function render(text) {
        return figlet.textSync(text, {
            font: font,
            width: term.cols(),
            whitespaceBreak: true
        }).trim();
    }

    // Elimina espacios en blanco y saltos de línea adicionales
    function trim(str) {
        return str.replace(/[\n\s]+$/, '');
    }

    // Genera colores de arcoíris en el texto    
    function rainbow(string, seed = Math.floor(Math.random() * 256)) {
        return lolcat.rainbow((char, color) => {
            char = $.terminal.escape_brackets(char);
            return `[[;${hex(color)};]${char}]`;
        }, string, seed).join('\n');
    }

    // Convierte el color RGB a formato hexadecimal
    function hex(color) {
        return '#' + [color.red, color.green, color.blue].map(n =>
            n.toString(16).padStart(2, '0')
        ).join('');
    }

    // Genera un número aleatorio entre 0 y max
    function rand(max) {
        return Math.floor(Math.random() * (max + 1));
    }

    // Comandos
    const command_list = ['clear'].concat(Object.keys(commands));
    const formatted_list = command_list.map(cmd => `<white class="command">${cmd}</white>`);
    const help = formatter.format(formatted_list);

    // Hacer clic en un comando para ejecutarlo
    $(document).on('click', '.command', function() {
        term.exec($(this).text());
    });

    // Hacer clic en un directorio para navegar a él
    $(document).on('click', '.directory', function() {
        const dir = $(this).text();
        term.exec(`cd ~/${dir}`);
    });

    // Resaltado de sintaxis en la terminal
    const re = new RegExp(`^\\s*(${command_list.join('|')})(\\s?.*)`);
    $.terminal.new_formatter([re, function(_, command, args) {
        return `<white>${command}</white><aqua>${args}</aqua>`;
    }]);

    // Personalizar colores de la terminal para que se asemeje a Ubuntu
    $.terminal.xml_formatter.tags.green = () => `[[;#44D544;]`;
    $.terminal.xml_formatter.tags.blue = (attrs) => `[[;#55F;;${attrs.class}]`;

    // Cambiar cursor a "pointer" para comandos y directorios
    $('<style>').text('.command, .directory { cursor: pointer; }').appendTo('head');

    
});
