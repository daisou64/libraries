Imports OxyPlot
Imports OxyPlot.Axes
Imports OxyPlot.Series

Public Class GraphMock

    Public Sub New(datalist As List(Of Decimal), max As Double, min As Double, scale As Double)

        InitializeComponent()
        Dim lineSeries = CreateLineSeries(datalist)
        Dim axes = CreateAxes(max, min, scale)
        CreateModel(lineSeries, axes)

    End Sub

    Private Function CreateLineSeries(datalist As List(Of Decimal)) As LineSeries
        Dim line As New LineSeries With {.Title = "Line", .MarkerType = MarkerType.Circle}
        datalist _
            .Select(Function(x, index) New DataPoint(index, x)) _
            .ToList() _
            .ForEach(Sub(x) line.Points.Add(x))
        Return line
    End Function

    Private Function CreateAxes(max As Double, min As Double, majorScale As Double) As LinearAxis
        Dim axes = New LinearAxis With {
            .Maximum = max,
            .Minimum = min,
            .MajorStep = majorScale,
            .MinorStep = CInt(majorScale) / GraphLogic.MinorNumberOfScale
        }
        Return axes
    End Function

    Private Sub CreateModel(lineSeries As LineSeries, axes As LinearAxis)
        Dim model As New PlotModel With {.Title = "chart"}
        model.Series.Add(lineSeries)
        model.Axes.Add(axes)
        PlotView1.Model = model
    End Sub

End Class