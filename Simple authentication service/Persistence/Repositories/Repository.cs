using Microsoft.EntityFrameworkCore;
using Persistence.Repositories.Interfaces;
using System.Linq.Expressions;

namespace Persistence.Repositories
{
    public class Repository : IRepository
    {
        protected DbContext Context;
        public Repository(DbContext dataContext)
        {
            this.Context = dataContext;
        }
        #region Create
        public async Task<T> CreateAsync<T>(T entity) where T : class
        {
            var result = await Context.Set<T>().AddAsync(entity);
            await Context.SaveChangesAsync();
            return result.Entity;
        }
        #endregion
        #region Read
        public async Task<T?> FirstOrNullAsync<T>(Expression<Func<T, bool>> predicate) where T : class
        {
            return await Context.Set<T>().FirstOrDefaultAsync(predicate);
        }
        public async Task<List<T>> GetWhereAsync<T>(Expression<Func<T, bool>> predicate) where T : class
        {
            return await Context.Set<T>().Where(predicate).ToListAsync();
        }
        public async Task<List<T>> GetAllAsync<T>() where T : class
        {
            return await Context.Set<T>().ToListAsync();
        }
        public Task<int> CountWhereAsync<T>(Expression<Func<T, bool>> predicate) where T : class
        {
            return Context.Set<T>().Where(predicate).CountAsync();
        }
        public Task<int> CountAllAsync<T>() where T : class
        {
            return Context.Set<T>().CountAsync();
        }
        public ValueTask<T?> FindAsync<T>(Guid predicate) where T : class
        {
            return Context.Set<T>().FindAsync(predicate);
        }
        #endregion
        #region Update
        public async Task<T> UpdateAsync<T>(T entity) where T : class
        {
            var result = Context.Set<T>().Update(entity);
            await Context.SaveChangesAsync();
            return result.Entity;
        }
        #endregion
        #region Delete
        private Guid GetKeyAsyncGuid<T>(T entity) where T : class
        {
            var keyName = Context.Model.FindEntityType(typeof(T)).FindPrimaryKey().Properties
                .Select(x => x.Name).Single();

            var key = (Guid)entity.GetType().GetProperty(keyName).GetValue(entity, null);
            return key;
        }
        public async Task<T?> DeleteAsync<T>(T entity) where T : class
        {
            var itemExists = await FindAsync<T>(GetKeyAsyncGuid(entity));

            if (itemExists is null)
            {
                return null;
            }

            var result = Context.Set<T>().Remove(entity);
            await Context.SaveChangesAsync();
            Context.Dispose();
            return result.Entity;
        }
        #endregion
    }
}
