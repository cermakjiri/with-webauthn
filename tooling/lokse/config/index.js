// @ts-check
/** @typedef {import('lokse').LokseConfig} LokseConfig */

/**
 *
 * @param partialConfig {Partial<LokseConfig>}
 * @returns {LokseConfig}
 */
exports.createLokseConfig = partialConfig => {
    return {
        sheetId: '1ULHtotp4PZj97UqK_9djUlRakB9r0T8SmnmtRW8JUJY',
        dir: 'translations',
        column: 'key_web',
        splitTranslations: true,
        ...partialConfig,
    };
};
