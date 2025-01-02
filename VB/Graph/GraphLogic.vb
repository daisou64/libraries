Imports System.ComponentModel
Imports System.ComponentModel.DataAnnotations
Imports System.Diagnostics.Eventing.Reader

Public Class GraphLogic

    Interface IGraphLogic
        Function GetMaxScale() As Decimal
        Function GetMinScale() As Decimal
        Function GetScale() As Decimal

    End Interface

    Public Const MinorNumberOfScale = 5
    Const MajorNumberOfScale = 4
    Const GraphResolution = MajorNumberOfScale * MinorNumberOfScale

    ''' <summary>
    ''' 最大値,最小値の差が1未満の場合は小数用ロジックを使用する
    ''' 最大値,最小値の差が1以上の場合は整数用ロジックを使用する
    ''' </summary>
    ''' <param name="dataList"></param>
    ''' <returns></returns>
    Public Shared Function UseLogic(dataList As List(Of Decimal)) As IGraphLogic
        Dim diff = dataList.Max() - dataList.Min()
        '整数部が1桁 and 0 の場合 = 1未満
        Dim integerPart = diff.ToString().ToList().TakeWhile(Function(x) x <> ".").ToList()
        Return If(integerPart.Count = 1 And integerPart(0) = "0", New AsFloat(dataList), New AsInt(dataList))
    End Function

    Public Class AsInt : Implements IGraphLogic

        Private List As List(Of Decimal)
        Private Incremental As Integer
        Private Resolution As Integer
        Private ValueDigit As Integer
        Private IncrementalDigit As Integer
        Private NiceCutMax As Decimal
        Private ProvisionallyMax As Decimal
        Private NiceCutMin As Decimal
        Private ProvisionallyMin As Decimal

        Public Sub New(list As List(Of Decimal))
            Me.List = list
            Me.ProvisionallyMax = list.Max()
            Me.ProvisionallyMin = list.Min()
            Me.ValueDigit = GetDigit(ProvisionallyMax - ProvisionallyMin)
            Me.Incremental = GetIncremental()
            Me.IncrementalDigit = GetDigit(Incremental)
            Me.Resolution = GetResoloution()
            Me.NiceCutMax = GetNiceCutMax()
            Me.NiceCutMin = GetNiceCutMin()
        End Sub

        Public Function GetScale() As Decimal Implements IGraphLogic.GetScale
            Return (Me.NiceCutMax - Me.NiceCutMin) / MajorNumberOfScale
        End Function

        Private Function IGraphLogic_GetMaxScale() As Decimal Implements IGraphLogic.GetMaxScale
            Return Me.Resolution * MaxMarginJustRightValue(Me.NiceCutMax + Me.Incremental)
        End Function

        Private Function IGraphLogic_GetMinScale() As Decimal Implements IGraphLogic.GetMinScale
            Return Resolution * MinMarginJustRightValue(NiceCutMin - Incremental)
        End Function


        Private Function MaxMarginJustRightValue(max As Decimal) As Decimal
            Return If(max Mod Resolution = 0, max / Resolution, MaxMarginJustRightValue(max + Me.Incremental))
        End Function

        Private Function MinMarginJustRightValue(min As Decimal) As Decimal
            Return If(min Mod Resolution = 0, min / Resolution, MinMarginJustRightValue(min - Me.Incremental))
        End Function

        Private Function GetDigit(val As Decimal) As Integer
            Dim chars = val.ToString().ToList()
            Return If(chars.Contains("."), chars.TakeWhile(Function(x) x <> ".").ToList().Count, chars.Count())
        End Function

        Private Function GetIncremental() As Integer
            Return If(Me.ValueDigit <= 2, 1, 1 * (10 ^ (Me.ValueDigit - 2)))
        End Function

        Private Function GetResoloution() As Integer
            Dim power = 1 * 10 ^ (Me.IncrementalDigit - 2)
            Return If(Me.Incremental <= 10, GraphResolution, GraphResolution * power)
        End Function

        Private Function GetNiceCutMax() As Integer
            Dim power = 1 * (10 ^ -(Me.IncrementalDigit - 1))
            Return Math.Ceiling(Me.ProvisionallyMax * power) / power
        End Function

        Private Function GetNiceCutMin() As Integer
            Dim power = 1 * (10 ^ -(Me.IncrementalDigit - 1))
            Return Math.Floor(Me.ProvisionallyMin * power) / power
        End Function

    End Class

    Public Class AsFloat : Implements IGraphLogic

        Public Sub New(datalist As List(Of Decimal))

        End Sub

        Public Function GetMaxScale() As Decimal Implements IGraphLogic.GetMaxScale
            Throw New NotImplementedException()
        End Function

        Public Function GetMinScale() As Decimal Implements IGraphLogic.GetMinScale
            Throw New NotImplementedException()
        End Function

        Public Function GetScale() As Decimal Implements IGraphLogic.GetScale
            Throw New NotImplementedException()
        End Function

    End Class

End Class


