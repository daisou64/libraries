Public Class GraphLogic2

    Public Shared Function AdjustRangeWithMargin(list As List(Of Decimal)) As (Decimal, Decimal, Decimal)
        Dim maxValue = list.Max()
        Dim minValue = list.Min()

        Dim range = maxValue - minValue

        Dim margin = range * 0.05

        Dim addMarginMax = maxValue + margin
        Dim addMarginMin = minValue - margin

        Dim roundUnit As Double
        If range < 1 Then
            Dim digit = range.ToString().SkipWhile(Function(x) x <> ".").Skip(1).TakeWhile(Function(x) x = "0").ToList().Count
            roundUnit = Math.Pow(10, -digit - 1)
        Else
            roundUnit = 5
        End If

        Dim adjustMax = Math.Ceiling(addMarginMax / roundUnit) * roundUnit
        Dim adjustMin = Math.Floor(addMarginMin / roundUnit) * roundUnit

        Dim totalRange = adjustMax - adjustMin

        Dim interval = Math.Ceiling(totalRange / 4 / roundUnit) * roundUnit

        Dim adjustMax2 = Math.Ceiling(addMarginMax / interval) * interval
        Dim adjustMin2 = Math.Floor(addMarginMin / interval) * interval

        Return (adjustMax2, adjustMin2, interval)
    End Function
End Class
