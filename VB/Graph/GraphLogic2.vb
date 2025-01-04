Imports System.Runtime.CompilerServices

Public Class GraphLogic2

    Public Shared Function AdjustRangeWithMargin(list As List(Of Decimal)) As (Decimal, Decimal, Decimal)


        Dim maxValue = list.Max()
        Dim minValue = list.Min()

        Dim range = maxValue - minValue

        Dim margin = range * 0.05

        Dim addMarginMax = maxValue + margin
        Dim addMarginMin = minValue - margin

        Dim floatValueDigit As Func(Of Decimal, Double) = Function(rng) rng.ToString().SkipWhile(Function(x) x <> ".").Skip(1).TakeWhile(Function(x) x = "0").ToList().Count
        Dim floatValueRoundUnit = Math.Pow(10, -floatValueDigit(range) - 1)
        Const intValueRoundUnit = 5

        Dim roundUnit As Double = If(range < 1, floatValueRoundUnit, intValueRoundUnit)

        Dim adjustMax = Math.Ceiling(addMarginMax / roundUnit) * roundUnit
        Dim adjustMin = Math.Floor(addMarginMin / roundUnit) * roundUnit

        Dim totalRange = adjustMax - adjustMin

        Dim interval = Math.Ceiling(totalRange / 4 / roundUnit) * roundUnit

        Dim adjustMax2 = Math.Ceiling(adjustMax / interval) * interval
        Dim adjustMin2 = Math.Floor(adjustMin / interval) * interval


        Return (adjustMax2, adjustMin2, interval)
    End Function

End Class
