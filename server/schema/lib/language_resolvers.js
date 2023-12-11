const Language = require('../../models/Language');

// Define resolvers for language-related queries and mutations
const language_resolvers = {
    Query: {
        async getLanguages() {
            try {
                const languages = await Language.find();
                return languages;

            } catch (error) {
                console.error('Error fetching languages:', error);
                throw new Error('Unable to fetch languages');
            }
        },
        async getCodeBlocks(_, { languageId }) {
            try {
                const language = await Language.findById(languageId);
                return language.codeBlocks;

            } catch (error) {
                console.error('Error fetching code blocks:', error);
                throw new Error('Unable to fetch code blocks');
            }
        },
    },

    Mutation: {
        async createLanguage(_, { name }) {
            try {
                const language = new Language({ name });
                await language.save();
                return language;
            } catch (error) {
                console.error('Error creating language:', error);
                throw new Error('Unable to create language');
            }
        },
        async createCodeBlock(_, { languageId, value }) {
            try {
                const language = await Language.findById(languageId);
                const codeBlock = { value };
                language.codeBlocks.push(codeBlock);
                await language.save();
                return codeBlock;
            } catch (error) {
                console.error('Error creating code block:', error);
                throw new Error('Unable to create code block');
            }
        },
    },
};

module.exports = language_resolvers;
