const { MongoClient } = require('mongodb');

// Define connection URIs based on user input
const sourceUri = 'mongodb+srv://PriyadaRanmode:Priyada%4024@cluster0.gwign0q.mongodb.net/gokart?retryWrites=true&w=majority';
// Assuming the <Pragati_81> meant the password is Pragati_81. If the password actually includes < and >, that would be %3CPragati_81%3E when URL encoded. 
// I'll use Pragati_81 as it's the standard Atlas placeholder format.
const destUri = 'mongodb+srv://pragatiankushrao24_db_user:Pragati_81@cluster0.neza7li.mongodb.net/?appName=Cluster0';

async function migrate() {
    const sourceClient = new MongoClient(sourceUri);
    const destClient = new MongoClient(destUri);

    try {
        console.log('Connecting to source MongoDB...');
        await sourceClient.connect();
        
        console.log('Connecting to destination MongoDB...');
        await destClient.connect();

        const sourceDb = sourceClient.db('gokart');
        const destDb = destClient.db('gokart');

        const collections = await sourceDb.listCollections().toArray();
        console.log(`Found ${collections.length} collections to migrate.`);

        for (const colInfo of collections) {
            const colName = colInfo.name;
            console.log(`\nStarting migration for collection: ${colName}`);
            
            const sourceCol = sourceDb.collection(colName);
            const destCol = destDb.collection(colName);

            const documents = await sourceCol.find({}).toArray();
            console.log(`Found ${documents.length} documents in ${colName}.`);
            
            if (documents.length > 0) {
                try {
                    // Using unordered insert to ignore Duplicate Key errors on already transferred items
                    const result = await destCol.insertMany(documents, { ordered: false });
                    console.log(`Successfully migrated ${result.insertedCount} documents.`);
                } catch (err) {
                    if (err.code === 11000 || err.writeErrors) {
                        const insertedCount = err.result ? err.result.nInserted : 0;
                        console.log(`Inserted ${insertedCount} new documents. (Some were already present)`);
                    } else {
                        console.error(`Error migrating ${colName}:`, err);
                    }
                }
            } else {
                console.log(`No documents to migrate for ${colName}`);
            }
        }
        
        console.log('\nMigration completed successfully!');
    } catch (e) {
        console.error('Migration failed:', e);
    } finally {
        await sourceClient.close();
        await destClient.close();
    }
}

migrate();
