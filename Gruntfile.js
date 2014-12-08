/* global require, module */

var path = require('path');

module.exports = function(grunt) {
    'use strict';

    // These plugins provide necessary tasks.
    /* [Build plugin & task ] ------------------------------------*/
    grunt.loadNpmTasks('grunt-module-dependence');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    var banner = '/*!\n' +
        ' * ====================================================\n' +
        ' * <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
        '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
        '<%= pkg.homepage ? " * " + pkg.homepage + "\\n" : "" %>' +
        ' * GitHub: <%= pkg.repository.url %> \n' +
        ' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
        ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %>\n' +
        ' * ====================================================\n' +
        ' */\n\n';

    var expose = '\nuse(\'kityminder\');\n';

    // Project configuration.
    grunt.initConfig({

        // Metadata.
        pkg: grunt.file.readJSON('package.json'),

        clean: {
            last: 'release'
        },

        // resolve dependence
        dependence: {
            options: {
                base: 'src',
                entrance: 'kityminder'
            },
            merge: {
                files: [{
                    src: 'src/**/*.js',
                    dest: 'release/kityminder.core.js'
                }]
            }
        },

        // concat
        concat: {
            closure: {
                options: {
                    banner: banner + '(function () {\n',
                    footer: expose + '})();'
                },
                files: {
                    'release/kityminder.core.js': ['release/kityminder.core.js']
                }
            }
        },

        uglify: {
            options: {
                banner: banner
            },
            minimize: {
                files: {
                    'release/kityminder.core.min.js': 'release/kityminder.core.js'
                }
            }
        }

    });


    // Build task(s).
    grunt.registerTask('default', ['clean', 'dependence', 'concat', 'uglify']);

};