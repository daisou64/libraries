Imports System.IO
Imports LiteDB

Public Class LocalCacheService(Of T As {CacheItem, New}) : Implements IUniqueLocalMachine(Of T), IDisposable
    Private ReadOnly DBPath As String
    Private ReadOnly Database As LiteDatabase
    Private ReadOnly DBName As String
    Const ProjectDirName As String = "projectDirName"

    Public Sub New()
        Dim commonAppDataPath = Environment.GetFolderPath(Environment.SpecialFolder.CommonApplicationData)
        DBName = GetType(T).Name
        DBPath = Path.Combine(commonAppDataPath, ProjectDirName, $"{DBName}.db")
        Directory.CreateDirectory(Path.GetDirectoryName(DBPath))
        Database = New LiteDatabase($"FileName={DBPath}; Connection=shared;")
        Database.GetCollection(Of T)(DBName).EnsureIndex(Function(x) x.Key, unique:=True)
    End Sub

    ''' <summary>
    ''' Update or Insert
    ''' </summary>
    ''' <param name="cacheItem"></param>
    Public Sub Upsert(cacheItem As T)
        Dim collection = Database.GetCollection(Of T)(DBName)
        collection.Upsert(cacheItem)
    End Sub

    ''' <summary>
    ''' Update or Insert, key is MachineName
    ''' </summary>
    ''' <param name="value"></param>
    Public Sub Upsert(value As String) Implements IUniqueLocalMachine(Of T).Upsert
        Upsert(New T() With {.Key = Environment.MachineName, .Value = value})
    End Sub

    ''' <summary>
    ''' Load Single Data
    ''' </summary>
    ''' <param name="key"></param>
    ''' <returns></returns>
    Public Function Load(key As String) As T
        Dim collection = Database.GetCollection(Of T)(DBName)
        If collection.Count() = 0 Then Return Nothing
        Return collection.FindAll().Where(Function(x) x.Key = key).SingleOrDefault()
    End Function

    ''' <summary>
    ''' Load Single Data, key is MachineName
    ''' </summary>
    ''' <returns></returns>
    Public Function Load() As T Implements IUniqueLocalMachine(Of T).Load
        Return Load(Environment.MachineName)
    End Function

    Public Sub Dispose() Implements IDisposable.Dispose
        Database?.Dispose()
    End Sub

End Class

Public MustInherit Class CacheItem
    <BsonId>
    Property Key As String
    Property Value As String

End Class

Public Class SampleItem : Inherits CacheItem

End Class

Public Interface IUniqueLocalMachine(Of T As CacheItem)
    Function Load() As T
    Sub Upsert(value As String)
End Interface


