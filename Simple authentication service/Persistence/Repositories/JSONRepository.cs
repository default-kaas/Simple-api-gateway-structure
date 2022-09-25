using Persistence.JSONObjects;
using Persistence.Repositories.Interfaces;
using System.Linq;
using System.Linq.Expressions;
using System.Text.Json;

namespace Persistence.Repositories
{
    public class JSONRepository : IRepository
    {
        private string Location { get; }
        public JSONRepository()
        {
            Location = "../Persistence/JSONs/Users.json";
        }
        public Task<int> CountAllAsync<T>() where T : class
        {
            throw new NotImplementedException();
        }

        public Task<int> CountWhereAsync<T>(Expression<Func<T, bool>> predicate) where T : class
        {
            throw new NotImplementedException();
        }

        public Task<T> CreateAsync<T>(T entity) where T : class
        {
            throw new NotImplementedException();
        }

        public Task<T?> DeleteAsync<T>(T entity) where T : class
        {
            throw new NotImplementedException();
        }

        public async Task<T?> FirstOrNullAsync<T>(Expression<Func<T, bool>> predicate) where T : class
        {
            return (await GetWhereAsync(predicate)).FirstOrDefault();
        }

        public async Task<List<T>> GetAllAsync<T>() where T : class
        {
            try
            {

                using FileStream openStream = File.OpenRead(Location);
                var result = await JsonSerializer.DeserializeAsync<JSONListContainer<T>>(openStream);
                
                return result.Models ?? default(List<T>);
            }
            catch
            {
                return default(List<T>);
            }
        }

        public async Task<List<T>> GetWhereAsync<T>(Expression<Func<T, bool>> predicate) where T : class
        {
            var result = await GetAllAsync<T>();
            if(result is null || result.Count() == 0)
                return default(List<T>);
            return result.Where(predicate.Compile()).ToList();
        }

        public Task<T> UpdateAsync<T>(T entity) where T : class
        {
            throw new NotImplementedException();
        }
    }
}
