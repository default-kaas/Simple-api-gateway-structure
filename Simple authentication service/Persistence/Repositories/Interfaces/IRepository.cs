using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Persistence.Repositories.Interfaces
{
    public interface IRepository
    {
        #region Create
        Task<T> CreateAsync<T>(T entity) where T : class;
        #endregion
        #region Read
        Task<T?> FirstOrNullAsync<T>(Expression<Func<T, bool>> predicate) where T : class;
        Task<List<T>> GetWhereAsync<T>(Expression<Func<T, bool>> predicate) where T : class;
        Task<List<T>> GetAllAsync<T>() where T : class;
        Task<int> CountWhereAsync<T>(Expression<Func<T, bool>> predicate) where T : class;
        Task<int> CountAllAsync<T>() where T : class;
        #endregion
        #region Update
        Task<T> UpdateAsync<T>(T entity) where T : class;
        #endregion
        #region Delete
        Task<T?> DeleteAsync<T>(T entity) where T : class;
        #endregion
    }
}
