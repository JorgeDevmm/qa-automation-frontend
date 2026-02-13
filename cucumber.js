/**
 * Configuración de Cucumber para el proyecto
 * Define el comportamiento de ejecución de los tests BDD
 */
module.exports = {
  default: {
    // Rutas donde se encuentran los step definitions y archivos de soporte
    require: [
      'features/step_definitions/**/*.ts',
      'features/support/**/*.ts'
    ],
    // Módulo necesario para ejecutar TypeScript
    requireModule: ['ts-node/register'],
    // Formatos de reporte de resultados
    format: [
      'progress',                                    // Progreso en consola
      'html:reports/cucumber-report.html',          // Reporte HTML
      'json:reports/cucumber-report.json'           // Reporte JSON
    ],
    // Opciones de formato
    formatOptions: { 
      snippetInterface: 'async-await'               // Usa async/await en snippets generados
    },
    // No publicar resultados en Cucumber Reports
    publishQuiet: true,
  }
};
