Imports System.Runtime.CompilerServices

Public Class GraphLogic2

    Public Shared Function AdjustRangeWithMargin(list As List(Of Decimal)) As (Decimal, Decimal, Decimal)
        Const ScaleLines As Integer = 4

        '0.0009 → 4, 0.0023 → 3
        Dim floatValueDigit As Func(Of Decimal, Double) =
            Function(rng) rng.ToString() _
                                .SkipWhile(Function(x) x <> ".") _
                                .Skip(1) _
                                .TakeWhile(Function(x) x = "0") _
                                .ToList() _
                                .Count + 1
        Dim floatValueRoundUnit As Func(Of Decimal, Double) = Function(rng) Math.Pow(10, -floatValueDigit(rng))
        Const IntValueRoundUnit As Double = 5

        Dim margin As Func(Of Decimal, Double) = Function(rng) rng * 0.05
        Dim roundMax As Func(Of Decimal, Double, Double) = Function(val, unit) Math.Ceiling(val / unit) * unit
        Dim roundMin As Func(Of Decimal, Double, Double) = Function(val, unit) Math.Floor(val / unit) * unit

        Dim maxValue = list.Max()
        Dim minValue = list.Min()

        '初期値の範囲
        Dim range = maxValue - minValue

        '初期値の範囲によって丸め単位を決定する
        Dim roundUnit As Double = If(range < 1, floatValueRoundUnit(range), IntValueRoundUnit)

        '初期値の範囲による丸め処理の実施
        Dim adjustMax = roundMax(maxValue + margin(range), roundUnit)
        Dim adjustMin = roundMin(minValue - margin(range), roundUnit)

        '調整値の範囲
        Dim adjustRange = adjustMax - adjustMin

        '目盛値の決定
        Dim interval = Math.Ceiling(adjustRange / ScaleLines / roundUnit) * roundUnit

        '最大値・最小値を目盛値上の値になるよう丸める
        Return (roundMax(adjustMax, interval), roundMin(adjustMin, interval), interval)
    End Function

End Class
