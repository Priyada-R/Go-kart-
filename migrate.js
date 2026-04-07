const { MongoClient } = require('mongodb');

// Source and destination URIs
const sourceUri = 'mongodb+srv://PriyadaRanmode:Priyada%4024@cluster0.gwign0q.mongodb.net/';
const destUri = 'mongodb+srv://pragatiankushrao24_db_user:Pragati_81@cluster0.neza7li.mongodb.net/';

const sourceDbName = 'gokart';
const destDbName = 'gokart';

async function migrateData() {
  const sourceClient = new MongoClient(sourceUri);
  const destClient = new MongoClient(destUri);

  try {
    await sourceClient.connect();
    console.log('Connected to source DB');

    await destClient.connect();
    console.log('Connected to destination DB');

    const sourceDb = sourceClient.db(sourceDbName);
    const destDb = destClient.db(destDbName);

    // Get all collections from the source database
    const collections = await sourceDb.listCollections().toArray();
    console.log(`Found ${collections.length} collections in source DB`);

    for (const collectionInfo of collections) {
      const collectionName = collectionInfo.name;
      console.log(`Migrating collection: ${collectionName}`);

      const sourceCollection = sourceDb.collection(collectionName);
      const destCollection = destDb.collection(collectionName);

      // Fetch all documents from the source collection
      const documents = await sourceCollection.find({}).toArray();
      
      console.log(`Found ${documents.length} documents in ${collectionName}`);
      
      if (documents.length > 0) {
        // Optional: clear dest collection if re-running
        // await destCollection.deleteMany({});
        
        try {
          await destCollection.insertMany(documents);
          console.log(`Successfully migrated ${documents.length} documents into ${collectionName}`);
        } catch (insertError) {
          if (insertError.code === 11000) {
            console.log(`Got duplicate key errors for ${collectionName}. You might have partially migrated data.`);
            // fallback to insert one by one
            let inserted = 0;
            for (const doc of documents) {
              try {
                await destCollection.insertOne(doc);
                inserted++;
              } catch (e) {
                // Ignore dup keys
              }
            }
            console.log(`Recovered and inserted ${inserted} non-duplicate documents into ${collectionName}`);
          } else {
            throw insertError;
          }
        }
      } else {
        console.log(`No documents to migrate in ${collectionName}`);
      }
    }

    console.log('Migration completed successfully!');
  } catch (error) {
    console.error('An error occurred during migration:', error);
  } finally {
    await sourceClient.close();
    await destClient.close();
  }
}

migrateData();
