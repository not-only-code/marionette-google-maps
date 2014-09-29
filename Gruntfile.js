module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        meta: {
            version: '<%= pkg.version %>',
            banner:
                '/**\n' +
                ' * <%= pkg.description %>\n' +
                ' * <%= pkg.version %>\n' +
                ' *\n' +
                ' * <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>\n' +
                ' * Distributed under <%= pkg.license %> license\n' +
                ' *\n' +
                ' * <%= pkg.homepage %>\n' +
                ' */\n'
        },
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            files: ['src/**/*.js', 'Gruntfile.js']
        },
        concat: {
            options: {
                banner: '<%= meta.banner %>;(function() {\n"use strict";\n\n',
                footer: '\n})(window || global || this);',
                sourceMap: true
            },
            dist: {
                src: [
                    'src/models/MarkerModel.js',
                    'src/collections/MarkersCollection.js',
                    'src/views/MarkerView.js',
                    'src/views/MapView.js'
                ],
                dest: 'dist/<%= pkg.name %>.js'
            }
        },
        uglify: {
            min: {
                options: {
                    beautify: false,
                    compress: {},
                    report: 'gzip'
                },
                files: {
                    'dist/<%= pkg.name %>.min.js': ['dist/<%= pkg.name %>.js']
                }
            }
        },
        watch: {
            js: {
                files: ['package.json', 'Gruntfile.js', 'src/**/*.js'],
                tasks: ['jshint', 'concat', 'uglify']
            },
            spec: {
                files: ['spec/**/*.js'],
                tasks: ['jasmine']
            }
        },
        jasmine: {
            src: 'dist/<%= pkg.name %>.js',
            options: {
                specs: 'spec/**/*.spec.js',
                vendor: [
                    'bower_components/jquery/dist/jquery.js',
                    'bower_components/underscore/underscore.js',
                    'bower_components/backbone/backbone.js',
                    'bower_components/backbone.babysitter/lib/backbone.babysitter.js',
                    'bower_components/backbone.wreqr/lib/backbone.wreqr.js',
                    'bower_components/marionette/lib/core/backbone.marionette.js'
                ]
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jasmine');

    grunt.registerTask('default', ['jshint', 'concat', 'uglify', 'watch:js']);
    grunt.registerTask('test', ['jasmine', 'watch:spec']);
};